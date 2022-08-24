define(['text!../../json/config.json'], function (configFile) {
  const config = JSON.parse(configFile);
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
    buildEndPointUrl(endpointProperty, id, searchTerm, pageNumber) {

      const url = `${config.isSecure ? 'https' :'http'}://${config.host}:${config.port}/${config.endpoints[endpointProperty]}`;

      if (searchTerm == null) {
        if (id == null) {
          if(pageNumber==null){
            return url;
          }
          else {
            return url + `?_page=${pageNumber}&_sort=firstName&_order=asc`;
          }

        } 
        else {
          return url + `/${id}`;
        }
      } 
      else {
        return url + `/?label_like=${searchTerm}&_limit=10&_sort=firstName&_order=asc`;
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
    async fetchData(endpointProperty, method, bodyData,pageNumber) {
      let fetchOptionsObject = null;
      if (method === 'POST') {
        fetchOptionsObject = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(bodyData),
        };

        const api_url = this.buildEndPointUrl(endpointProperty);
        let dataFromService;
        try {
          const response = await fetch(api_url, fetchOptionsObject);
          if (!response.ok) throw Error('Something went wrong');
          dataFromService = await response.json();
        } catch (error) {
          throw Error('Something went wrong');
        }

        return dataFromService;
      }

      if (method === 'GET') {

        if (bodyData != null) {
          const api_url = this.buildEndPointUrl(endpointProperty, null, bodyData);
          let dataFromService;
          try {
            const response = await fetch(api_url, fetchOptionsObject);
            if (!response.ok) throw Error('Something went wrong');
            dataFromService = await response.json();
          } catch (error) {
            throw Error('Something went wrong');
          }


          return dataFromService;

        } else {



          const api_url = this.buildEndPointUrl(endpointProperty,null,null,pageNumber);
          let dataFromService;
          try {
            const response = await fetch(api_url, fetchOptionsObject);
            if (!response.ok) throw Error('Something went wrong');
            dataFromService = await response.json();
          } catch (error) {
            throw Error('Something went wrong');
          }


          return dataFromService;
        }
      }


      if (method === 'DELETE') {
        fetchOptionsObject = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE'
        };
        const api_url = this.buildEndPointUrl(endpointProperty, bodyData, null);
        let dataFromService;
        try {
          const response = await fetch(api_url, fetchOptionsObject);
          if (!response.ok) throw Error('Something went wrong');
          dataFromService = await response.json();
        } catch (error) {
          throw Error('Something went wrong');
        }

        return dataFromService;
      }




    }

  }
  return new ServiceUtils();
});