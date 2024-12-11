import GetCustomerByParam from '@/app/services/ActiveProduct';
import styles from './homepage.module.css';
export default async function NamePage() {
  const data = await GetCustomerByParam();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Informacion del cliente</h1>
      <ul className={styles.cardList}>
        <pre className={styles.cardDetails}>
          {JSON.stringify(data, null, 2)}
        </pre>
        {/* {data..map((item: {id: string; name: string; details: string}) => (
          <li key={item.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{item.name}</h2>
            <p className={styles.cardDetails}>
              {item.details || 'No details available.'}
            </p>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
