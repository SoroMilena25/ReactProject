
'use client';

import { useState, useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";

const Page = () => {
    const [categories, setCategories] = useState([]);
    const [nouveauCategorie, setNouveauCategorie] = useState('');

    useEffect(() => {
        chargerCategories();
    }, []);

    const chargerCategories = () => {
        fetch('/api/categories')
            .then(r => r.json())
            .then(data => {
                console.log("Catégories chargées:", data);
                setCategories(data);
            })
            .catch(err => console.error("Erreur catégories:", err));
    };

    const ajouterCategorie = async (e) => {
        e.preventDefault();
        
        if (!nouveauCategorie.trim()) {
            alert("Le nom de la catégorie est obligatoire !");
            return;
        }

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom: nouveauCategorie })
            });

            if (response.ok) {
                chargerCategories();
                setNouveauCategorie('');
                alert("Catégorie ajoutée avec succès !");
            } else {
                alert("Erreur lors de l'ajout de la catégorie");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur de connexion");
        }
    };

    const supprimerCategorie = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                const response = await fetch(`/api/categories?id=${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    chargerCategories();
                    alert("Catégorie supprimée avec succès !");
                } else {
                    alert("Erreur lors de la suppression");
                }
            } catch (error) {
                console.error("Erreur:", error);
                alert("Erreur de connexion");
            }
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '3em', color: '#e50914', fontFamily: 'Gotham', fontWeight: 'bold' }}>
                NETFLIX
            </h1>
            
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px', fontFamily: 'Gotham', fontWeight: 'bold', fontSize: '30px' }}>Catégories</h2>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    {categories.map(category => (
                        <CategoryCard 
                            key={category.id} 
                            category={category} 
                            onDelete={supprimerCategorie}
                        />
                    ))}
                </div>

                {categories.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#999', fontStyle: 'italic' }}>
                        Aucune catégorie pour le moment. Ajoutez-en une !
                    </p>
                )}

                <div style={{
                    border: '2px solid #e50914',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#1a1a1a'
                }}>
                    <h3 style={{ color: '#e50914', marginBottom: '15px', fontFamily: 'Gotham', fontWeight: 'bold', color: 'white', fontSize: '20px' }}>
                        Ajouter une nouvelle catégorie
                    </h3>
                    
                    <form onSubmit={ajouterCategorie} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={nouveauCategorie}
                            onChange={(e) => setNouveauCategorie(e.target.value)}
                            placeholder="Ex: Horreur, Romance..."
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#333',
                                color: 'white',
                                border: '1px solid #555',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                            required
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '12px 25px',
                                backgroundColor: '#e50914',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            Ajouter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;