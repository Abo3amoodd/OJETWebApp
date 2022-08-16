define(['text!../../json/config.json'], function (configFile) {
  const config= JSON.parse(configFile);
  class ServiceUtils {
        /**
         * @description 
         * @returns 
         */
        constructor() {}
        /**
       * @function buildEndPointUrl
       * @description Generates a unique ID
       * @returns a unique ID based on a internal counter
       */
            buildEndPointUrl(endpointProperty,id,firstName,pageCount) {

            const url= `${config.isSecure ? 'https' :'http'}://${config.host}:${config.port}/${config.endpoints[endpointProperty]}`;
            
            if(firstName==null){
              if(id==null){
                return url+`?_start=${pageCount}&_limit=10`;
              }
              else{
                return url+`/${id}`;
              }
            }
            else{
              return url+`/?start=0&_limit=10&label_like=${firstName}`;
            }
            

            }
          /**
         * @function fetchData
         * @description executes API according to method used
         * @param {}endpointProperty
         * @param {}method
         * @param {}bodyData
         * @returns (Promise<Any>)
         */
          async fetchData(endpointProperty,method,bodyData) {
          let fetchOptionsObject=null;
          if(method==='POST'){
            fetchOptionsObject={
              headers:  {  
                'Content-Type':'application/json',
              }, 
              method: 'POST',
              body: JSON.stringify(bodyData),
            };
          
          const api_url=this.buildEndPointUrl(endpointProperty);
          let dataFromService;
          try {
            const response=await fetch(api_url,fetchOptionsObject);
            if(!response.ok) throw Error('Something went wrong');
            dataFromService=await response.json();
          } 
          catch (error) {
            throw Error('Something went wrong');
          }
  
          return dataFromService;
        }

        if(method==='GET'){
        
        if(bodyData!=null){
          const api_url=this.buildEndPointUrl(endpointProperty,null,bodyData);
          let dataFromService;
          try {
            const response=await fetch(api_url,fetchOptionsObject);
            if(!response.ok) throw Error('Something went wrong');
            dataFromService=await response.json();
          } 
          catch (error) {
            throw Error('Something went wrong');
          }
          
          
          return dataFromService;

        }
        else{

        

        const api_url=this.buildEndPointUrl(endpointProperty);
        let dataFromService;
        try {
          const response=await fetch(api_url,fetchOptionsObject);
          if(!response.ok) throw Error('Something went wrong');
          dataFromService=await response.json();
        } 
        catch (error) {
          throw Error('Something went wrong');
        }
        
        
        return dataFromService;
        }
      }


      if(method==='DELETE'){
        fetchOptionsObject={
          headers:  {
            'Content-Type':'application/json',
          }, 
          method: 'DELETE'
        };
      const api_url=this.buildEndPointUrl(endpointProperty,bodyData,null);
      let dataFromService;
      try {
        const response=await fetch(api_url,fetchOptionsObject);
        if(!response.ok) throw Error('Something went wrong');
        dataFromService=await response.json();
      } 
      catch (error) {
        throw Error('Something went wrong');
      }

      return dataFromService;
    }




      }
      
  }
  return new ServiceUtils();
});
