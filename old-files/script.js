$.ajax({
    url: "http://parthmaniar.herokuapp.com/slideshare/downloadcount",
    dataType: "json",
    success: function(result, status, xhr) {
      console.log(result.downloadCount.toString());
     setTimeout(function(){
        document.getElementById("downloadC").textContent="Total Downloads: "+result.downloadCount;
}, 10);
      
    }
});
function download(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
    }

/* Helper function */

function validateURL(url) {   
    var re = /^http(s)?:\/\/www.slideshare.net\//ig;
    return re.test(url);
}

$("#submit").click(function() {

    if(validateURL(document.getElementsByName("url")[0].value))
    {



    $("#submit").addClass("loading");
    setTimeout(function() {
      $("#submit").addClass("hide-loading");
      // For failed icon just replace ".done" with ".failed"
      $(".done").addClass("finish");
    }, 3000);
    setTimeout(function() {
      $("#submit").removeClass("loading");
      $("#submit").removeClass("hide-loading");
      $(".done").removeClass("finish");
      $("#submit").removeClass("finish");
    }, 5000);

    
var res = document.getElementsByName("url")[0].value.split("/");
url="https://parthmaniar.herokuapp.com/slideshare?url="+document.getElementsByName("url")[0].value;

download(url,res[4]);
    }
    else{
        alert("Enter a valid SlideShare Link (Make sure http/https and www is included)");
    }
});

$(".button-collapse").sideNav();

particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;