video="";
obj=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();

}

function setup() {
 canvas=createCanvas(480,380);
canvas.center();  
}

function draw() {
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<obj.length; i++) {
            document.getElementById("status").innerHTML=" status:objects detected";
            document.getElementById("number_of_obj").innerHTML="number_of_obj+obj.length";
            per=floor(obj[i].confidence*100);
            text(obj[i].label+" "+per+"%",obj[i].x,obj[i].y);
            nofill();
            stroke("red");
            rect(obj[i].x,obj[i].y,obj[i].width,obj[i].height);
        }
    }
}

function start() {
    objectDetector=ml5.objectDetector("cocossd ", modelLoaded);
    document.getElementById("status").innerHTML="status: detecting object "
}

function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        obj=results;
    }
}