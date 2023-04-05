console.log("Im in idb.js")

// if (!('indexedDB' in window)) {
//   console.log("This browser doesn't support IndexedDB");
//   alert("This browser doesn't support IndexedDB")
//   return;
// }
var request;
var db;
function idbInit(){
  console.log("in idbinit")
   return new Promise(
      function(resolve, reject) {
request = indexedDB.open('formio', 1);
console.log("request:",request);

request.onerror = (event) => {
  console.error(`Database error: ${event.target.errorCode}`);
};

request.onsuccess = (event) => {
  console.log("Database Success", event);
  db = event.target.result;
  resolve(true)

};


request.onupgradeneeded = (event) => {
  console.log("in onupgradeneeded:", event)
  db = event.target.result;



db.createObjectStore('BO');

 
  

};
      }
  )
}
function idbInsert(data) {
  console.log("in idbInsert", data);

  insertIdb(db, data);

  

}

// function idbGet(data) {
//   console.log("in idbGet", data);

//   // getIdb(db);
  

// }

function idbGet(id){
  console.log("in idbGet",id);
  return new Promise(
    function(resolve, reject) {
      console.log("dbb:",db)
            console.log("dbb tx:",db.transaction)

      console.log("req tx",request)
       console.log("req tx",request.transaction)

  
    

  
    var transaction =  db.transaction('BO', 'readonly');
      console.log("tx",transaction);
      var objectStore = transaction.objectStore("BO");
    var objectRequest = objectStore.get(id);

      objectRequest.onerror = function(event) {
        reject(Error('Error text'));
      };

      objectRequest.onsuccess = function(event) {
        console.log("objectRequest:", objectRequest)
        if (objectRequest.result) resolve(objectRequest.result);
        else resolve({});
      };

      
    
    
    })
}

function insertIdb(db, data) {
  // create a new transaction
  const txn = db.transaction('BO', 'readwrite');

  // get the Contacts object store
  const store = txn.objectStore('BO');
  //
  let query = store.add(data);

  // handle success case
  query.onsuccess = function(event) {
    console.log(event);
  };

  // handle the error case
  query.onerror = function(event) {
    console.log(event.target.errorCode);
  }

  // close the database once the 
  // transaction completes
  txn.oncomplete = function() {
    // db.close();
  };
}

function getIdb(db) {
  const txn = db.transaction('BO', 'readonly');
  const store = txn.objectStore('BO');

  let query = store.getAll();

  query.onsuccess = (event) => {
    if (!event.target.result) {
      console.log(`No data with this conversation id ${id} was found`);
    } else {
      console.table(event.target.result);
      
    }
  };

  query.onerror = (event) => {
    console.log(event.target.errorCode);
  }

  txn.oncomplete = function() {
    
    // db.close();
  };
};

function idbPut(data, id) {
  console.log("in idbPut",id);
  
  const txn = db.transaction('BO', 'readwrite');

  
  const store = txn.objectStore('BO');
  
  let v = {...data,id:id};
  
  let query = store.put(v, id);

  
  query.onsuccess = function(event) {
    console.log(event);
  };

  
  query.onerror = function(event) {
    console.log(event.target.errorCode);
  }

  txn.oncomplete = function() {
    // db.close();
  };
}