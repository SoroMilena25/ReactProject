
import Link from 'next/link';

const OeuvreCard = ({ oeuvre }) => {
    return (
        <Link href={`/oeuvre/${oeuvre.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                border: '1px solid #333',
                borderRadius: '10px',
                padding: '15px',
                backgroundColor: '#1a1a1a',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
                <img 
                    src={oeuvre.image} 
                    alt={oeuvre.titre}
                    style={{ 
                        width: '100%', 
                        height: '250px', 
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}
                />
                <h3 style={{ color: '#fff', margin: '0 0 5px 0', fontSize: '1.1em' }}>
                    {oeuvre.titre}
                </h3>
                <p style={{ color: '#ccc', margin: '0 0 5px 0', fontSize: '0.9em' }}>
                    {oeuvre.realisateur}
                </p>
                <p style={{ color: '#999', margin: '0', fontSize: '0.8em' }}>
                    {oeuvre.annee}
                </p>
            </div>
        </Link>
    );
};

export default OeuvreCard;