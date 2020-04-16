interface IHelpers{
	upperString:Function;
};


const helpers:IHelpers = {upperString(){}};

helpers.upperString = (str:string):string => {
	//return cadena.toUpperCase();
	
	return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
	
}

export default helpers;