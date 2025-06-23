
import { useState } from 'react';

const FormAjoutOeuvre = ({ categorieId, categorieNom, onOeuvreAdded }) => {
    const [formData, setFormData] = useState({
        titre: '',
        realisateur: '',
        image: '',
        type: 'film',
        annee: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.titre || !formData.realisateur) {
            alert("Le titre et le réalisateur sont obligatoires !");
            return;
        }

        try {
            const response = await fetch('/api/oeuvres', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    categorie_id: parseInt(categorieId),
                    annee: formData.annee ? parseInt(formData.annee) : null
                })
            });

            if (response.ok) {
                setFormData({
                    titre: '',
                    realisateur: '',
                    image: '',
                    type: 'film',
                    annee: ''
                });
                
                alert(`${formData.type === 'film' ? 'Film' : 'Série'} ajouté avec succès !`);
                
                if (onOeuvreAdded) {
                    onOeuvreAdded();
                }
            } else {
                alert("Erreur lors de l'ajout");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur de connexion");
        }
    };

    return (
        <div style={{
            border: '2px solid #e50914',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#1a1a1a'
        }}>
            <h3 style={{ color: '#e50914', marginBottom: '20px', fontFamily: 'Gotham', fontWeight: 'bold', color: 'white', fontSize: '20px' }}>
                Ajouter une oeuvre dans : {categorieNom}
            </h3>
            
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'white' }}>Type:</label>
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
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'white' }}>Année:</label>
                        <input
                            type="number"
                            name="annee"
                            value={formData.annee}
                            onChange={handleInputChange}
                            min="1900"
                            max="2030"
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#333',
                                color: 'white',
                                border: '1px solid #555',
                                borderRadius: '5px'
                            }}
                            placeholder="2024"
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'white' }}>Titre *:</label>
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
                        placeholder="Ex: Avengers, Stranger Things..."
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'white' }}>Réalisateur *:</label>
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
                        placeholder="Ex: Christopher Nolan, Duffer Brothers..."
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'white' }}>URL Image:</label>
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
                        placeholder="https://images.tmdb.org/t/p/w500/..."
                    />
                </div>

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
                    Ajouter le {formData.type === 'film' ? 'film' : 'série'}
                </button>
            </form>
        </div>
    );
};

export default FormAjoutOeuvre;