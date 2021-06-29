import {useState, useEffect} from 'react';
import axios from 'axios';
import {RiHeart3Fill} from 'react-icons/ri';
import moment from 'moment';
interface User {
  id: number;
  firstName: string;
  name: string;
  onClick: () => void[];
}
function Homes() {
  const [datadetails, setDatadetails] = useState<any[]>([]);
  const [name, nameSet] = useState<string | null>(null);
  const [usersw, setUserList] = useState<User[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [nextpage, setUrlnext] = useState<any[]>([]);
  const [prevpage, setUrlprev] = useState<any[]>([]);
  const [disablednext, setDisablednext] = useState<boolean>(false);
  const [disabledprev, setDisabledprev] = useState<boolean>(false);

  useEffect(() => {
    axios.get('https://swapi.dev/api/planets/?page=1').then((response) => {
      setUserList(response.data.results);
      setUrlnext(response.data);
      setUrlprev(response.data);
    });
  }, []);

  const getnextpage = (ev: any) => {
    console.log(ev.next, 'aiis');
    if (ev.next === null) {
      setDisablednext(true);
    } else {
      axios.get(`${ev.next}`).then((response) => {
        setUserList(response.data.results);
        setUrlnext(response.data);
        setUrlprev(response.data);
        setDisablednext(false);
        setDisabledprev(false);

      });
    }
  };
  const getprevpage = (ev: any) => {
    console.log(ev, 'prevv');
    if (ev.previous === null) {
      setDisabledprev(true);
    } else {
      axios.get(`${ev.previous}`).then((response) => {
        setUserList(response.data.results);
        setUrlprev(response.data);
        setUrlnext(response.data);
        setDisabledprev(false);
        setDisablednext(false);
      });
    }
  };

  const getdetails = (w: any) => {
    setDatadetails(w);
    nameSet('details');
  };

  const setWish = (value: any) => {
    setData([...data, value]);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('app_form_education', JSON.stringify(data));
    }
  }, [data]);

  const renderDetails = (data: any) => {
    return (
      <div>
        <div className='container'>
          <main className='page-content'>
            <div className='card'>
              <div className='content'>
                <h4 className='title'> {data.name} </h4>
                <h4 className='titledets'>
                  Name : {data.name}
                  <h4 className='titledets'>
                    Orbital Period : {data.orbital_period}{' '}
                  </h4>
                  <h4 className='titledets'>
                    Rotation Period : {data.rotation_period}{' '}
                  </h4>
                  <h4 className='titledets'>Diameter : {data.diameter} </h4>
                  <h4 className='titledets'>
                    Created : {moment(data.created).format('DD MMM YYYY')}{' '}
                  </h4>
                </h4>
                <button className='btn' onClick={() => setWish(data)}>
                  Add To WishList
                  <RiHeart3Fill className='heart' />
                </button>
              </div>
            </div>
          </main>
          <div>
            <h2
              className='titledet'
              style={{cursor: 'grabbing'}}
              onClick={() => nameSet(null)}>
              Close
            </h2>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {name === 'details' ? (
        renderDetails(datadetails)
      ) : (
        <div className='container'>
          <main className='page-content'>
            {usersw.map((ev) => {
              return (
                <div className='card'>
                  <div className='content'>
                    <h2 className='title'>{ev.name}</h2>
                    <button className='btn' onClick={() => getdetails(ev)}>
                      View Planets
                    </button>
                  </div>
                </div>
              );
            })}
          </main>
          <div className='container'>
            <main className='page-content'>
            {disablednext === false ?
               <button
               className='btn-page'
               onClick={() => getnextpage(nextpage)}>
               Next
             </button> :
              <div/>
             }
              {disabledprev === false ?
               <button
               className='btn-page'
               onClick={() => getprevpage(prevpage)}>
               Previous
             </button> :
              <div/>
             }
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
export default Homes;
