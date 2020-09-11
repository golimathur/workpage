import React, {useState, useEffect, useRef} from 'react';
import {Form, ListGroup, Jumbotron} from 'react-bootstrap';


export default function Search(){
     const[query, setQuery] = useState('')
     const[search, setSearch] = useState([])
     const focusSearch = useRef(null)

     useEffect(() => {focusSearch.current.focus ()}, []);

     const getSearch = async (query) => {
         const results = await fetch(`https://apiuat.actingoffice.com/hubs/calls?id={query}`,{headers: {'accept': 'text/json'}})
         const searchData  = await results.json()
         return searchData.results
     }

 


     const sleep = (ms) => {
         return new Promise(resolve => setTimeout(resolve,ms))
     }

     useEffect(() => {
         let currentQuery = true
         const controller  = new AbortController()

         const loadSearch = async () => {
             if (!query) return setSearch([])
             await sleep(350)
             if (currentQuery){
                 const search = await getSearch(query, controller)
                 setSearch(search)
             }
         }

         loadSearch()

         return () => {
             currentQuery = false
             controller.abort()
         }
     }, [query])

     let searchComponents = search.map((search, index) => {
         return(
             <ListGroup.item key={index} action variant = "secondary">
                 {search.search}
                 </ListGroup.item>
         )
     })

     const searchStyles = {
        root: {
            height: 38,
            width: 200,
           
    
    
    
        }
    }

     return(
         <div>
             <Jumbotron fluid>
             <Form id = "search-form">
                 <Form.Control
                     type="text"
                     placeholder="search"
                     ref={focusSearch}
                     onChange={(e) => setQuery(e.target.value)}
                     style = {searchStyles}
                  />
                     </Form>
                     <ListGroup>
                         {searchComponents}
                         </ListGroup>
                         </Jumbotron>
             </div>
     )

}





 
  
