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
            buildEndPointUrl(endpointProperty) {
            const url= `${config.isSecure ? 'https' :'http'}://${config.host}:${config.port}/${config.endpoints[endpointProperty]}`;
            return url;
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


      if(method==='DELETE'){
        fetchOptionsObject={
          headers:  {
            'Content-Type':'application/json',
          }, 
          method: 'DELETE',
          id: bodyData,
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

    //  return dataFromService;
    }




      }
      
  }
  return new ServiceUtils();
});
