
import Link from 'next/link';

const CategoryCard = ({ category, onDelete }) => {
    return (
        <div style={{
            border: '2px solid #e50914',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: '#1a1a1a',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link 
                href={`/category/${category.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <h3 style={{ 
                    margin: '0 0 15px 0', 
                    color: '#e50914',
                    fontSize: '1.5em',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    paddingTop: '10px'
                }}>
                    {category.nom}
                </h3>

            </Link>
            
            <button 
                onClick={() => onDelete(category.id)}
                style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9em',
                    padding: '5px 10px'
                }}
            >
                X
            </button>
        </div>
    );
};

export default CategoryCard;