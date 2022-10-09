let video;
let poseNet;
let pose;
let skeleton;

function setup(){
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses){
  console.log(poses);
  if(poses.length>0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded(){
  console.log('poseNet ready')
}

function draw(){
  image(video, 0, 0);
  if(pose){
      fill(255,0,0);
      ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 32);
      ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 32);
    
      for(let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(255);
        line(a.position.x, a.position.y, b.position.x, b.position.y);
        //Find the lenght of this line and console.log it
        let len = dist(a.position.x, a.position.y, b.position.x, b.position.y)
        console.log(len);
        if(len < 420){
          console.log("Nice Posture!") 
        }else{
          console.log("Fix Posture!") 
        }
      }
      

  }

}
