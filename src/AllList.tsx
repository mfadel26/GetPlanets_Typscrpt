import {useState, useEffect} from 'react';
// interface User {
//   id: number;
//   firstName: string;
//   name: string;
//   onClick:() => void[];
// }
// interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
//   ev:object;
// }
function AllList() {
  //   const [datadetails, setDatadetails] = useState<any[]>([]);
  //   const [name, nameSet] = useState<string | null>(null);
  //   const [usersw, setUserList] = useState<User[]>([]);
  //   const [data, setData] = useState<any[]>([]);
  const [datawish, setDatawish] = useState<any[]>([]);

  useEffect(() => {
    getAll(localStorage.getItem('app_form_education'));
  }, []);
  const getAll = (ev: any) => {
    const a = JSON.parse(ev);
    setDatawish(a);
  };

  return (
    <div className='container'>
      {!datawish ? (
        'Nodata'
      ) : (
        <main className='page-content'>
          {datawish.map((ev) => {
            return (
              <div className='card'>
                <div className='content'>
                  <h2 className='title'>{ev.name}</h2>
                  <button className='btn'>View Planets</button>
                </div>
              </div>
            );
          })}
        </main>
      )}
    </div>
  );
}

export default AllList;
