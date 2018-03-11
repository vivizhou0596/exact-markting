export function batchCalcNumFactory(){  //测算用户群编号生成方法，YYMMDDHHMMSS+random
    let date = new Date();  
    let year = date.getFullYear();  
    let month = date.getMonth()+1;  
    let day = date.getDate();  
    if(month<10) month = "0"+month;  
    if(day<10) day = "0"+day;  
    let hours = date.getHours();  
    let mins = date.getMinutes();  
    let secs = date.getSeconds();
    let msecs = date.getMilliseconds();  
    if(hours<10) hours = "0"+hours;  
    if(mins<10) mins = "0"+mins;  
    if(secs<10) secs = "0"+secs;  
    let rand = "";
	for(let i = 0; i < 3; i++){
	    let r = Math.floor(Math.random() * 10);
	    rand += r;
	}
    return year+''+month+''+day+''+hours+''+mins+''+secs+''+rand;
}