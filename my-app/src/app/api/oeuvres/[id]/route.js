
import mysql from 'mysql2/promise';
import dbConfig from '../../../config/database.js';

export async function GET(request, { params }) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT o.*, c.nom as categorie_nom FROM oeuvres o LEFT JOIN categories c ON o.categorie_id = c.id WHERE o.id = ?',
      [params.id]
    );
    
    if (rows.length === 0) {
      return Response.json({ error: 'Oeuvre non trouvée' }, { status: 404 });
    }
    
    return Response.json(rows[0]);
  } catch (error) {
    console.error('Erreur récupération oeuvre:', error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}