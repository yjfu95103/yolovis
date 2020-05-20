window.onload = function () {

    // var WIDTH = 1800;
    // var HEIGHT = 1200;
    var WIDTH = '8500px';
    var HEIGHT = '600px';
    var timer = 0;
     // ---- rotate dog image-----------------------------------------------
    dx = 0, dy = 0 + 60 * 3* Math.sin(45 * Math.PI/180);
    a = 1, b = 0, c = 0, d = 1;
    b = -Math.sin(30 * Math.PI/180);
    b2 = -Math.sin(60 * Math.PI/180);
    matrix = [a, b, c, d, dx, dy];

    // var translate = 'translate(' + (WIDTH /5) + ',' + (0) + ')';
    var svg = d3.select("#darknet")
                .append("svg")
                .attr('id','darknet_svg')
                .attr('width', WIDTH)
                .attr('height', HEIGHT);

    function image(imgName, indexX, indexY){
      svg.append('g')
        .attr('transform', "matrix("+[0.1, 0.3*b2, 0, 0.3, indexX, indexY]+")" )
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 15)
        .attr('height', 15)
        .append('svg:image')
        .attr('class', 'image')  
        .attr('width', 416)
        .attr('height', 416)      
        // .attr('id', 'img_'+imgName.split(".",1))
        .attr('id', imgName)
        .attr('xlink:href', './data/' + imgName)
        .style("opacity", 1);

      return indexX

    }  

    function Filter(type, layer, id, dx, dy, size){   
      var conv = svg.append('g')
          // .attr('class', 'convImg')
          // .attr('id', 'conv'+layer+'_'+id)
          .attr('transform', "matrix("+[size*0.1, size*0.3*b2, 0, size*0.3, dx, dy]+")" )
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 15)
          .attr('height', 15)
          .append('svg:image')          
          .attr('class', type+'Img')
          .attr('id', 'layer_vis_l'+ layer +'_f' +id)
          // .attr('xlink:href', './data/yolo_v2_generated/'+ 'layer_vis_l'+ layer +'_f' +id +'.jpg')          
          // .style("opacity", 0.8);     
          
      return size*0.3*b2;   
    }

    function Convolution(type, layer, id, dx, dy, size){   
      var conv = svg.append('g')
          // .attr('class', 'convImg')
          // .attr('id', 'conv'+layer+'_'+id)
          .attr('transform', "matrix("+[size*0.1, size*0.3*b2, 0, size*0.3, dx, dy]+")" )
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 15)
          .attr('height', 15)
          .append('svg:image')          
          .attr('class', type+'Img')
          .attr('id', type + layer +'_'+id)
          // .attr('xlink:href', './data/img/'+ type + layer +'_'+ id +'.jpg')          
          // .style("opacity", 0.8);
      
      
      // timer = timer + 1000;
      // // console.log(timer);
         

      //     d3.select(type + layer +'_'+id)
      //       .transition() // First fade to green.
      //         .delay(timer)         
      //         .style("opacity", 0.1);
          
      return size*0.3*b2;   
    }

    //make line between CONVs 
    function makeLine(startX, endX, Y, id){
      var lineData = [[startX, Y], [endX, Y]];        
      var line = d3.line();    
      svg.append("path")     
          .attr('class', 'lines') 
          .attr('id', 'line_'+id)
          .attr("d", line(lineData))
          .attr("stroke", "#55a5fa")
          .attr("stroke-width", "3px")
          .attr("fill", "none")
          .style("opacity", 0.5);


    }

    //make curve line between CONVs that is different row 
    function makeCurveLine(startX, startY, endX, endY, midY, id){
      var p1=[startX, startY],
          p2=[startX+10, startY],
          p3=[startX+10, midY],
          p4=[endX-10, midY],
          p5=[endX-10, endY],
          p6=[endX, endY];

      var lineData = [p1,p2,p3,p4,p5,p6];              
      var line = d3.line();    

      svg.append("path")
          .attr('class', 'lines')
          .attr('id', 'line_'+id)
          .attr("d", line(lineData))
          .attr("stroke", "#55a5fa")
          .attr("stroke-width", "3px")
          .attr("fill", "none")
          .style("opacity", 0.5);

    }

    //make cube  
    function makeCube(startX, startY, endX, tensorNum, filterSize, color){
      // console.log(startX, startY, endX, tensorNum, filterSize, color)
      var Size = filterSize/416;
      var p1 = [startX, startY], //node 1,5
          p2 = [endX, startY], //node 2,8
          p3 = [endX, startY+124*Size], //node 3,9
          p4 = [startX, startY+124*Size], //node 4
          p5 = [startX+41*Size, startY-108*Size], //node 6
          p6 = [endX+41*Size, startY-108*Size], //node 7,11
          p7 = [endX+41*Size, startY+16*Size]; //node 10
          p8 = [startX+41*Size, startY+16*Size];

      var lineData = [
                      // p2,p3,p4,p1,p2,
                      // p2,p1,p5,p6,p2,
                      // p2,p3,p7,p6,p2
                      p1, p2, p3, p4, p1,
                      p5, p6, p2, p3, p7, p6,
                      p5, p8, p7, p3, p4, p8
                    ];       

      var line = d3.line();  

      var cube = svg.append("path")    
          .attr('class', 'cubes')      
          .attr('id', 'cube')
          .attr("d", line(lineData))
          // .attr("stroke", "#55a5fa")
          .attr("stroke", color)
          .attr("stroke-width", "1px")
          .attr("fill", "none")
          .attr("z-index", -50)
          .style("opacity", 0.5);
        
        // console.log(startX, startY, endX, tensorNum, filterSize, color);
      var cubeText = [p4,p1,p5,p6];
      textOnCube(svg, cubeText, tensorNum, filterSize);
      
      // d3.select('#lines').on('click', function() {
      // });
    }
    //---------------------------------------------------------------
    function makeLayer(layer, Type, tensorNum, startX, startY, filterSize){
      var endX = 0; 
      var Size = 1;
      var color = 'blue'
      var layerType = ''

      // tensorNum = tensorNum > 256 ? tensorNum*0.8 : tensorNum;

      if(Type=='Conv'){
        layerType = 'conv'
        for(var i=0;i<tensorNum;i++){
          Convolution(layerType, layer, i, startX+i*0.5, startY, Size, filterSize, tensorNum);   
          endX = startX+i*0.5;  
          color = '#55a5fa';
        }
      }else if(Type=='Maxpool'){
        layerType = 'maxpool'
        for(var i=0;i<tensorNum;i++){
          Convolution(layerType, layer, i, startX+i*0.5, startY, Size, filterSize, tensorNum);   
          endX = startX+i*0.5; 
          color = '#ff1111'; 
        }
      }else if(Type=='Filter'){
        layerType = 'filter'
        for(var i=0;i<tensorNum;i++){
          Filter(layerType, layer, i, startX+i*0.5, startY, Size, filterSize, tensorNum);   
          endX = startX+i*0.5; 
          color = '#ff6611'; 
        }  
      }else if(Type=='route'){
        // console.log('layer:',layer);
      }
      console.log(startX, startY, endX, tensorNum, filterSize);
      makeCube(startX, startY, endX, tensorNum, filterSize, color); 
      return endX; 
    }
    //---------------------------------------------------------------
    function textOnCube(svg, line, tensorNum , filterSize){
      svg.append("text")
      .attr("x", (line[0][0]+line[1][0])/2)
      .attr("y", (line[0][1]+line[1][1])/2)
      .attr("dx", "-1.5em")
      .style("font-size", "8px")
      .text(filterSize);

      svg.append("text")
      .attr("x", (line[1][0]+line[2][0])/2)
      .attr("y", (line[1][1]+line[2][1])/2)
      .attr("dx", "-1.5em")
      .style("font-size", "8px")
      .text(filterSize);

      svg.append("text")
      .attr("x", (line[2][0]+line[3][0])/2)
      .attr("y", (line[2][1]+line[3][1])/2)
      .attr("dx", "-1.5em")
      .style("font-size", "8px")
      .text(tensorNum);

    }
    //---------------------------------------------------------------
    // function imageClick(){

    //   d3.selectAll(".maxpoolImg")
    //     .transition() // First fade to green.
    //       .delay(1000)
    //       .style("opacity", 0.2)


    //   d3.selectAll(".maxpoolImg")
    //     .transition() // First fade to green.
    //       .delay(5000)
    //       .style("opacity", 0.2)
    //       .remove();

    // }

    
    //---------------------------------------------------------------
    
    function imageHover(){

      $("image.image").hover(
        function () {
          $("#imgscale").css("display","block").css("position","absolute").css("top",(event.offsetY+10) + "px").css("left",(event.offsetX+10) + "px");
          $("#imgscale").append("<img src='" + 'data/'+ this.id + "'style='width:200px'>");
          $("#imgscale").append("<p>"+this.id+"</p>");
        }, function () {
          $("#imgscale").find("img").remove();
          $("#imgscale").find("p").remove();
        }
      );
  
      $(".convImg").hover(
        function () {
          var data = this.id.split(".",1)
          var layer = this.id.split(".",1)
          var num = this.id.split(".",2)
          if(data){
            console.log()
          }
          $("#imgscale").css("display","block").css("position","absolute").css("top",(event.offsetY+10) + "px").css("left",(event.offsetX-10) + "px").css("width","300px");
          $("#imgscale").append("<img src='" + 'data/img/'+this.id+'.jpg' + "'style='width:200px'>");
          $("#imgscale").append("<p>"+this.id+'.jpg'+"</p>");
        }, function () {
          $("#imgscale").find("img").remove();
          $("#imgscale").find("p").remove();
        }
      );
  
      $(".maxpoolImg").hover(
        function () {
          $("#imgscale").css("display","block").css("position","absolute").css("top",(event.offsetY+10) + "px").css("left",(event.offsetX-10) + "px");
          $("#imgscale").append("<img src='" + 'data/img/'+this.id+'.jpg' + "'style='width:200px'>");
          $("#imgscale").append("<p>"+this.id+'.jpg'+"</p>");
        }, function () {
          $("#imgscale").find("img").remove();		
          $("#imgscale").find("p").remove();      
        }
      );

      $(".filterImg").hover(
        function () {
          $("#imgscale").css("display","block").css("position","absolute").css("top",(event.offsetY+10) + "px").css("left",(event.offsetX-10) + "px");
          $("#imgscale").append("<img src='" + 'data/yolo_v2_generated/'+this.id+'.jpg' + "'style='width:200px'>");
          $("#imgscale").append("<p>"+this.id+'.jpg'+"</p>");
        }, function () {
          $("#imgscale").find("img").remove();		
          $("#imgscale").find("p").remove();      
        }
      );

    }

    
    function darknet_19(){
      var end2 =0;
      var end = image('input.jpg', 20, 250);
      //makeLayer(layer, type, filter, dx, dy, imageSize)
      makeLine(end+60, end+65, 250, 1);
      end = makeLayer(0, 'Conv', 32, end+70, 250, 416);
      end2 = makeLayer(0, 'Filter', 32, end, 80, 220);
      makeLine(end+45, end+55, 250, 2);
      end = makeLayer(1, 'Maxpool', 32, end+60, 250, 208);
      end2 = makeLayer(1, 'Filter', 64, end-20, 80, 220);
      makeLine(end+25, end+35, 250, 3);
      end = makeLayer(2, 'Conv', 64, end+40, 250, 208);
      end2 = makeLayer(2, 'Filter', 128, end-30, 80, 220);
      makeLine(end+20, end+30, 250, 4);
      end = makeLayer(3, 'Maxpool', 64, end+30, 250, 104);
      end2 = makeLayer(3, 'Filter', 64, end-20, 80, 220);
      makeLine(end+15, end+25, 250, 5);
      end = makeLayer(4, 'Conv', 128, end+30, 250, 104);
      end2 = makeLayer(4, 'Filter', 128, end-60, 80, 220);
      makeLine(end+15, end+25, 250, 6);
      end = makeLayer(5, 'Conv', 64, end+30, 250, 104);
      end2 = makeLayer(5, 'Filter', 64, end-30, 80, 220);
      makeLine(end+15, end+25, 250, 7);
      end = makeLayer(6, 'Conv', 128, end+30, 250, 104);
      end2 = makeLayer(6, 'Filter', 128, end-60, 80, 220);
      makeLine(end+15, end+25, 250, 8);
      end = makeLayer(7, 'Maxpool', 128, end+30, 250, 52);
      end2 = makeLayer(7, 'Filter', 128, end-70, 80, 220);
      makeLine(end+15, end+25, 250, 9);
      end = makeLayer(8, 'Conv', 256, end+30, 250, 52);
      end2 = makeLayer(8, 'Filter', 256, end-130, 80, 220);
      makeLine(end+10, end+25, 250, 10);
      end = makeLayer(9, 'Conv', 128, end+30, 250, 52);
      end2 = makeLayer(9, 'Filter', 128, end-60, 80, 220);
      makeLine(end+10, end+25, 250, 11);
      end = makeLayer(10, 'Conv', 256, end+30, 250, 52);
      end2 = makeLayer(10, 'Filter', 256, end-130, 80, 220);
      makeLine(end+10, end+25, 250, 12);
      end = makeLayer(11, 'Maxpool', 256, end+30, 250, 26);
      end2 = makeLayer(11, 'Filter', 256, end-130, 80, 220);
      makeLine(end+10, end+25, 250, 13);
      end = makeLayer(12, 'Conv', 512, end+30, 250, 26);
      end2 = makeLayer(12, 'Filter', 512, end-260, 80, 220);
      makeLine(end+10, end+25, 250, 13);
      end = makeLayer(13, 'Conv', 256, end+30, 250, 26);
      end2 = makeLayer(13, 'Filter', 256, end-130, 80, 220);
      makeLine(end+10, end+25, 250, 14);
      end = makeLayer(14, 'Conv', 512, end+30, 250, 26); 
      end2 = makeLayer(14, 'Filter', 512, end-260, 80, 220); 
      makeLine(end+10, end+25, 250, 15);  
      end = makeLayer(15, 'Conv', 256, end+30, 250, 26);
      end2 = makeLayer(15, 'Filter', 256, end-130, 80, 220);
      makeLine(end+10, end+25, 250, 16);
      end = makeLayer(16, 'Conv', 512, end+30, 250, 26); 
      end2 = makeLayer(16, 'Filter', 512, end-260, 80, 220);
      makeLine(end+10, end+25, 250, 17);
      end = makeLayer(17, 'Maxpool', 512, end+30, 250, 13); //seperate
      end2 = makeLayer(17, 'Filter', 512, end-260, 80, 220);
      makeCurveLine(end+10, 230, 5700, 180, 180, 61)
      makeLine(end+10, end+35, 250, 18);
      end = makeLayer(18, 'Conv', 1024, end+45, 250, 13);
      end2 = makeLayer(18, 'Filter', 1024, end-520, 380, 220);
      makeLine(end+10, end+25, 250, 19);    
      end = makeLayer(19, 'Conv', 512, end+30, 250, 13);
      end2 = makeLayer(19, 'Filter', 512, end-260, 380, 220);
      // makeCurveLine(end+10, 250, 30, 250, 290, 20)
      

      // end = 0;
      makeLine(end+10, end+25, 250, 60); 
      end = makeLayer(20, 'Conv', 1024, end+30, 250, 13);
      end2 = makeLayer(20, 'Filter', 1024, end-520, 380, 220);
      makeLine(end+10, end+25, 250, 20);
      end = makeLayer(21, 'Conv', 512, end+30, 250, 13);
      end2 = makeLayer(21, 'Filter', 512, end-260, 380, 220);
      makeLine(end+10, end+25, 250, 21);
      end = makeLayer(22, 'Conv', 1024, end+30, 250, 13); 
      end2 = makeLayer(22, 'Filter', 1024, end-520, 380, 220);
      makeLine(end+10, end+25, 250, 22);
      end = makeLayer(23, 'Conv', 1024, end+30, 250, 13);
      end2 = makeLayer(23, 'Filter', 1024, end-520, 380, 220);
      makeLine(end+10, end+25, 250, 23);
      end = makeLayer(24, 'Conv', 1024, end+30, 250, 13);
      end2 = makeLayer(24, 'Filter', 1024, end-520, 380, 220);
      // makeLine(end+10, end+25, 250, 24);
      // makeCurveLine(end+10, 250, 6000, 250, 200, 62)

      end = 5710;
      end = makeLayer(26, 'Conv', 64, end+10, 180, 26);
      end2 = makeLayer(26, 'Filter', 64, end-30, 80, 220);      
      // makeLine(end+10, end+25, 180, 26);
      // end = makeLayer(27, 'Conv', 256, end+30, 180, 13);  // layer16 size/2 ''reorg'' 
      // end2 = makeLayer(27, 'Filter', 256, end-130, 80, 220);
      // makeCurveLine(end+10, 180, 5970, 240, 180, 62)
      makeCurveLine(end+10, 180, 6010, 240, 180, 62)
      // makeLine(end+10, end+35, 80, 27); 

      // end = makeLayer(28, 'route', 1024, end+30, 1250, 26);  // route layer24 and layer26
      end = 5980;
      makeLine(end+10, end+35, 250, 27);
      end = makeLayer(29, 'Conv', 1024, end+45, 250, 13);
      end2 = makeLayer(28, 'Filter', 1024, end-520, 380, 220);
      makeLine(end+10, end+25, 250, 28);
      end = makeLayer(30, 'Conv', 425, end+30, 250, 13);
      end2 = makeLayer(29, 'Filter', 130, end-225, 380, 220);
      makeLine(end+10, end+25, 250, 29);

      image('predictions.jpg', end+40, 250);

    }
    
    darknet_19();
    imageHover();
    // imageClick();

  //  

    // d3.selectAll(".maxpoolImg")
    //     .transition() // First fade to green.
    //       .delay(1000)
    //       .style("opacity", 0.2)


    // d3.selectAll(".maxpoolImg")
    //     .transition() // First fade to green.
    //       .delay(5000)
    //       .style("opacity", 0.2)
    //       .remove();

    d3.select(this).on("click", function() {
      console.log("click")
      d3.select(this)
        .transition() // First fade to green.
          .delay(1000)
          .style("opacity", 0.8)
          // .remove();

      d3.select(this)
      .transition() // First fade to green.
        .delay(1000)
        .style("opacity", 0.8)
        // .remove();
    })

    

      
};