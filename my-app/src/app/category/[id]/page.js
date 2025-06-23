
'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import OeuvreCard from '@/components/OeuvreCard';
import FormAjoutOeuvre from '@/components/FormAjoutOeuvre';

const CategoryPage = ({ params }) => {
    const [category, setCategory] = useState(null);
    const [oeuvres, setOeuvres] = useState([]);
    const router = useRouter();
    const { id } = use(params);

    useEffect(() => {
        chargerDonnees();
    }, [id]);

    const chargerDonnees = () => {
        fetch(`/api/categories`)
            .then(r => r.json())
            .then(data => {
                const cat = data.find(c => c.id == id);
                setCategory(cat);
            })
            .catch(err => console.error("Erreur catégorie:", err));

        fetch(`/api/oeuvres?categorie_id=${id}`)
            .then(r => r.json())
            .then(data => {
                console.log("Oeuvres chargées:", data);
                setOeuvres(data);
            })
            .catch(err => console.error("Erreur oeuvres:", err));
    };

    if (!category) {
        return <div style={{ color: 'white', padding: '20px' }}>Chargement...</div>;
    }

    const films = oeuvres.filter(o => o.type === 'film');
    const series = oeuvres.filter(o => o.type === 'serie');

    return (
        <div style={{ padding: '20px', backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white' }}>

            <h1 style={{ color: '#e50914', marginBottom: '40px', fontSize: '2.5em', fontFamily: 'Gotham', fontWeight: 'bold', color: 'white' }}>
                Catégorie: {category.nom}
            </h1>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>🎬 Films ({films.length})</h2>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '20px' 
                }}>
                    {films.map(film => (
                        <OeuvreCard key={film.id} oeuvre={film} />
                    ))}
                </div>
                {films.length === 0 && (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>Aucun film dans cette catégorie</p>
                )}
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>📺 Séries ({series.length})</h2>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '20px' 
                }}>
                    {series.map(serie => (
                        <OeuvreCard key={serie.id} oeuvre={serie} />
                    ))}
                </div>
                {series.length === 0 && (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>Aucune série dans cette catégorie</p>
                )}
            </div>

            <FormAjoutOeuvre 
                categorieId={id}
                categorieNom={category.nom}
                onOeuvreAdded={chargerDonnees}
            />
        </div>
    );
};

export default CategoryPage;