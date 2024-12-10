// import {DataApi} from '@/services/DataApi';
import { ButtonDelete } from '../components/Button';
import {DataApi} from '../services/DataApi';
import styles from './homepage.module.css';

export default async function NamePage({
  searchParams,
}: {
  searchParams: {number?: string};
}) {
  const limit = searchParams.number ? parseInt(searchParams.number, 10) : 10; // Valor predeterminado: 10
  const data = await DataApi({limit});

  return (
    <div className={styles.container}>
      <ButtonDelete />
      <h1 className={styles.title}>Listado de Rockets</h1>
      <ul className={styles.cardList}>
        {data.docs.map((item: {id: string; name: string; details: string}) => (
          <li key={item.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{item.name}</h2>
            <p className={styles.cardDetails}>
              {item.details || 'No details available.'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
