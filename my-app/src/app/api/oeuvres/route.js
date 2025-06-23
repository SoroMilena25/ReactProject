
import mysql from 'mysql2/promise';
import dbConfig from '../../config/database.js';

export async function GET(request) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const categorieId = url.searchParams.get('categorie_id');
    
    let query = `
      SELECT o.*, c.nom as categorie_nom 
      FROM oeuvres o 
      LEFT JOIN categories c ON o.categorie_id = c.id
    `;
    
    const params = [];
    const conditions = [];
    
    if (type) {
      conditions.push('o.type = ?');
      params.push(type);
    }
    
    if (categorieId) {
      conditions.push('o.categorie_id = ?');
      params.push(categorieId);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY o.annee DESC';
    
    const [rows] = await connection.execute(query, params);
    return Response.json(rows);
  } catch (error) {
    console.error('Erreur BDD oeuvres:', error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function POST(request) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const { titre, realisateur, image, type, categorie_id, annee } = await request.json();
    
    if (!titre || !realisateur || !type) {
      return Response.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }
    
    const [result] = await connection.execute(
      'INSERT INTO oeuvres (titre, realisateur, image, type, categorie_id, annee) VALUES (?, ?, ?, ?, ?, ?)',
      [titre, realisateur, image, type, categorie_id || null, annee || null]
    );
    
    return Response.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Erreur insertion oeuvre:', error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function DELETE(request) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return Response.json({ error: 'ID manquant' }, { status: 400 });
    }
    
    const [result] = await connection.execute(
      'DELETE FROM oeuvres WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return Response.json({ error: 'Oeuvre non trouvée' }, { status: 404 });
    }
    
    return Response.json({ success: true, message: 'Oeuvre supprimée' });
  } catch (error) {
    console.error('Erreur suppression oeuvre:', error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function PUT(request) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const { titre, realisateur, image, type, categorie_id, annee } = await request.json();
    
    if (!id) {
      return Response.json({ error: 'ID manquant' }, { status: 400 });
    }
    
    const [result] = await connection.execute(
      'UPDATE oeuvres SET titre = ?, realisateur = ?, image = ?, type = ?, categorie_id = ?, annee = ? WHERE id = ?',
      [titre, realisateur, image, type, categorie_id || null, annee || null, id]
    );
    
    if (result.affectedRows === 0) {
      return Response.json({ error: 'Oeuvre non trouvée' }, { status: 404 });
    }
    
    return Response.json({ success: true, message: 'Oeuvre modifiée' });
  } catch (error) {
    console.error('Erreur modification oeuvre:', error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}