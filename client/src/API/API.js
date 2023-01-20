import Axios from "axios";

//export const adminCredentials = {username: "admin", password: "1234"}

export function getStocks(URL){
    return Axios.get(URL + "/getStocks").then((response) => {return(response)});
}

export function getAuth(URL, userName){
    return Axios.get(URL + "/getUserAuthToken?userName=" + userName).then((response) =>{return(response)});
}

export function updateStock(URL, userName, ticker, newPrice){
    return getAuth(URL, userName).then((auth)=>{
        return Axios.post(URL + "/updateStock?ticker="+ticker+"&price="+newPrice, {}, {headers:{'token' : auth.data.authToken}}).then((response) => {return(response)});
    });

    //return Axios.post(URL + "/updateStock?ticker="+ticker+"&price="+newPrice).then((response) => {return(response)});
}

export function userLogin(URL, userName, password){
    return Axios.get(URL + "/login?userName="+userName+"&password="+password).then((response) =>{return(response)});
}
/**
export function createInquiry(URL, values){
    const dt = new Date();
    return Axios.post(URL + "/createInquiry",
        {user :{
            name : values.firstName + " " + values.lastName,
            email : values.email,
            phone : values.p1 + "-" + values.p2 + "-" + values.p3,
        },
        inquiry: values.q,
        UTCTime: dt.getTime(),
        timeString: dt.getMonth()+"/"+dt.getDay()+"/"+dt.getFullYear() + " | " + dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' , hour12: true }),
        waitList : values.wait,
    }
    ).then((response)=>{return(response.status)});
}

export function getAllInquiries(URL){
    return Axios.get(URL + "/getAllInquiries").then((response)=> {return(response)});
}

export function deleteInquiry(URL, values){
    return Axios.delete(URL + "/deleteInquiry", {data : { UTCTime : values} }).then((response)=> {return(response)});
}
 */

// export function getAllInquiries(URL){
//     return Axios.get(URL + "/getInquiries",
//         {user :{
//             name : values.firstName + " " + values.lastName,
//             email : values.email,
//             phone : values.p1 + "-" + values.p2 + "-" + values.p3,
//         },
//         inquiry: values.q,
//         timestamp: Date().toLocaleUpperCase(),
//         waitList : values.wait,
//     }
//     ).then((response)=>{
//         return(response.status);
//         //alert("Inquiry Created!")
//     });
// }

/**
export function createUser(URL, values){
    return Axios.post(URL + "/createUser", {name: values.firstName, email : values.email}).then((response) =>{
        return(response.status);
    });
}
 */