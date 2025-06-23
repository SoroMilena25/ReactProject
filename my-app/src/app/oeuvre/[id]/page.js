
'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

const OeuvreDetailPage = ({ params }) => {
    const [oeuvre, setOeuvre] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        titre: '',
        realisateur: '',
        image: '',
        type: 'film',
        categorie_id: '',
        annee: ''
    });
    const router = useRouter();
    const { id } = use(params);

    useEffect(() => {
        fetch(`/api/oeuvres/${id}`)
            .then(r => r.json())
            .then(data => {
                setOeuvre(data);
                setFormData({
                    titre: data.titre,
                    realisateur: data.realisateur,
                    image: data.image || '',
                    type: data.type,
                    categorie_id: data.categorie_id || '',
                    annee: data.annee || ''
                });
            })
            .catch(err => console.error("Erreur chargement:", err));

        fetch('/api/categories')
            .then(r => r.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Erreur catégories:", err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/oeuvres?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    categorie_id: formData.categorie_id || null,
                    annee: formData.annee ? parseInt(formData.annee) : null
                })
            });

            if (response.ok) {
                alert(`${formData.type === 'film' ? 'Film' : 'Série'} modifié avec succès !`);
                setIsEditing(false);
                
                const updatedData = await fetch(`/api/oeuvres/${id}`);
                const updated = await updatedData.json();
                setOeuvre(updated);
            } else {
                alert('Erreur lors de la modification');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce ${oeuvre.type === 'film' ? 'film' : 'série'} ?`)) {
            try {
                const response = await fetch(`/api/oeuvres?id=${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert(`${oeuvre.type === 'film' ? 'Film' : 'Série'} supprimé avec succès !`);
                    router.push('/');
                } else {
                    alert('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur de connexion');
            }
        }
    };

    if (!oeuvre) {
        return <div style={{ color: 'white', padding: '20px' }}>Chargement...</div>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white' }}>

            <h1 style={{ color: '#e50914', marginBottom: '30px', fontFamily: 'Gotham', fontWeight: 'bold', color: 'white', fontSize: '2.5em' }}>
                Détails du {oeuvre.type === 'film' ? 'film' : 'série'}
            </h1>

            {!isEditing ? (
                <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                    <div style={{ flexShrink: 0 }}>
                        <img 
                            src={oeuvre.image} 
                            alt={oeuvre.titre}
                            style={{ 
                                width: '300px', 
                                height: '400px', 
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                        <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '2em' }}>
                            {oeuvre.titre}
                        </h2>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Réalisateur : </strong> {oeuvre.realisateur}
                        </div>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Type : </strong> {oeuvre.type === 'film' ? 'Film' : 'Série'}
                        </div>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <strong >Catégorie : </strong> {oeuvre.categorie_nom || 'Non assignée'}
                        </div>
                        
                        <div style={{ marginBottom: '30px' }}>
                            <strong>Année : </strong> {oeuvre.annee || 'Non renseignée'}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button 
                                onClick={() => setIsEditing(true)}
                                style={{ 
                                    padding: '12px 25px', 
                                    backgroundColor: '#007bff', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Modifier
                            </button>
                            <button 
                                onClick={handleDelete}
                                style={{ 
                                    padding: '12px 25px', 
                                    backgroundColor: '#dc3545', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    border: '2px solid #e50914',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#1a1a1a'
                }}>
                    <h3 style={{ color: '#e50914', marginBottom: '20px' }}>
                        ✏️ Modifier "{oeuvre.titre}"
                    </h3>
                    
                    <form onSubmit={handleUpdate}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Type:</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        backgroundColor: '#333',
                                        color: 'white',
                                        border: '1px solid #555',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <option value="film">🎬 Film</option>
                                    <option value="serie">📺 Série</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Catégorie:</label>
                                <select
                                    name="categorie_id"
                                    value={formData.categorie_id}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        backgroundColor: '#333',
                                        color: 'white',
                                        border: '1px solid #555',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <option value="">-- Aucune catégorie --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nom}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Titre *:</label>
                            <input
                                type="text"
                                name="titre"
                                value={formData.titre}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: '1px solid #555',
                                    borderRadius: '5px'
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Réalisateur *:</label>
                            <input
                                type="text"
                                name="realisateur"
                                value={formData.realisateur}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: '1px solid #555',
                                    borderRadius: '5px'
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>URL Image:</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: '1px solid #555',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Année:</label>
                            <input
                                type="number"
                                name="annee"
                                value={formData.annee}
                                onChange={handleInputChange}
                                min="1900"
                                max="2030"
                                style={{
                                    width: '200px',
                                    padding: '10px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: '1px solid #555',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button 
                                type="submit"
                                style={{ 
                                    padding: '12px 25px', 
                                    backgroundColor: '#28a745', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                💾 Sauvegarder
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsEditing(false)}
                                style={{ 
                                    padding: '12px 25px', 
                                    backgroundColor: '#6c757d', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                ❌ Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default OeuvreDetailPage;