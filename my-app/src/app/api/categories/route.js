
import mysql from 'mysql2/promise';
import dbConfig from '../../config/database.js';

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute('SELECT * FROM categories ORDER BY nom');
    return Response.json(rows);
  } catch (error) {
    console.error('Erreur BDD categories:', error);
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
    
    const { nom } = await request.json();
    
    if (!nom) {
      return Response.json({ error: 'Le nom est obligatoire' }, { status: 400 });
    }
    
    const [result] = await connection.execute(
      'INSERT INTO categories (nom) VALUES (?)',
      [nom]
    );
    
    return Response.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Erreur insertion categorie:', error);
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
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return Response.json({ error: 'Catégorie non trouvée' }, { status: 404 });
    }
    
    return Response.json({ success: true, message: 'Catégorie supprimée' });
  } catch (error) {
    console.error('Erreur suppression catégorie:', error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}