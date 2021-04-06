export function TimeFormate(timeStr,formStr){//时间序列化
    if(!timeStr){return ""}
    let time=new Date(timeStr),str=formStr;
    if(time!=="Invalid Date"){
       str=str.replace("yyyy",time.getFullYear());
       str=str.replace("MM",(time.getMonth()+1).toString().padStart(2,"0"));
       str=str.replace("dd",time.getDate().toString().padStart(2,"0"));
       str=str.replace("HH",time.getHours().toString().padStart(2,"0"));
       str=str.replace("mm",time.getMinutes().toString().padStart(2,"0"));
       str=str.replace("ss",time.getSeconds().toString().padStart(2,"0"));
    }
    return str;
}
export function pressImage(image, compressionRatio = .7){
	/*
    image: img object
    compressionRatio: 0 - 1
	*/
	return new Promise((resolve, reject) => {
		const [w, h] = [
			image.width * compressionRatio,
			image.height * compressionRatio,
		];
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const [anw, anh] = [
			document.createAttribute('width'),
			document.createAttribute('height'),
		];
		anw.nodeValue = w;
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(image, 0, 0, w, h);
		canvas.toBlob((blob) => {
			const base64 = canvas.toDataURL('image/jpeg', compressionRatio);
			const img = new Image();
			img.src = base64;
			img.onload = () => {
				resolve([img, blob]);
			};
		}, 'image/jpeg', compressionRatio);
	});
};

export const openFile = function(accept,callback){//will not be call if user dont interact with browser.
    let fileInput = document.createElement("input");
    fileInput.setAttribute("display","none");
    fileInput.setAttribute("type","file");
    fileInput.setAttribute("accept",accept);
    fileInput.addEventListener("change",(e)=>{
        callback && callback(e);
    });
    fileInput.click();
}

export function getsearchParams(){//获取url参数
	let str=window.location.href;
	if(!str||!str.split("?")[1]){return;}
	let Parr=str.split("?")[1].split("&"),obj={};
	Parr.map(val=>{val && Object.defineProperty(obj,val.split("=")[0],{value:val.split("=")[1],enumerable:true});return val});
	return obj;
}