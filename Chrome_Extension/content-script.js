const url = 'https://digitaltasks.net';

chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "toggle"){
        toggle();
    }
})

const sidePanel = document.createElement('div');
const iframe = document.createElement('iframe');
sidePanel.style.boxShadow = "0 1px 5px 0 rgba(0, 0, 0, 0.2)";
sidePanel.style.border = "1px solid #d0d0d0";
sidePanel.style.background = "white";
sidePanel.style.height = "100%";
sidePanel.style.width = "0px";
sidePanel.style.position = "fixed";
sidePanel.style.top = "0px";
sidePanel.style.right = "0px";
sidePanel.style.zIndex = "9000000000000000000";
iframe.style.height = '100%';
iframe.style.width = '100%';
iframe.src = url;
iframe.frameBorder = 0;

document.body.appendChild(sidePanel);
sidePanel.appendChild(iframe);

function toggle(){
    if(sidePanel.style.width === "0px"){
        sidePanel.style.width = "318px";
    }
    else{
        sidePanel.style.width = "0px";
    }
}