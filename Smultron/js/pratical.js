window.onload=function(){
	window.requestAnimFrame=(function(){
		return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){
			window.setTimeout(callback,1000/60);
		};
	})();

		var can=document.getElementById("canvas");
		var canvasBg=document.getElementsByClassName("canvasBg")[0];
		var simpleItem=document.getElementsByClassName("simple-item");
		// can.width=document.body.clientWidth ;
		// can.height=document.body.clientHeight;
		var cw=canvasBg.clientWidth;
		var ch=canvasBg.clientHeight;
		can.width=cw ;
		can.height=ch;
		var cxt=can.getContext("2d");

		var circles=[];		//存放圆形粒子池
		var rects=[];		//存放正方形粒子池
		var triangles=[];	//存放三角形粒子池
		var i=0;
		// var count=100;
		var x;				//鼠标的位置
		var y;

		/**
		 * 圆形粒子对象
		 * @param {[type]} x [description] 中心点
		 * @param {[type]} y [description] 中心点
		 * @param {[type]} r [description] 半径
		 */
		function Circle(x,y,r){
			this.x=x;
			this.y=y;
			this.r=r;
			this.speed=Math.random()*0.5+1;	//速度
			this.direction=Math.random()*Math.PI*2;	//方向
		}
		/**
		 * 更新圆心坐标
		 * @return {[type]} [description]
		 */
		Circle.prototype.update=function(){
			this.x+=Math.cos(this.direction)*this.speed;
			this.y+=Math.sin(this.direction)*this.speed;
			if(this.x<this.r){
				this.x=this.r;
				this.direction=Math.PI-this.direction;
			}
			else if(this.x>=(cw-this.r)){
				this.x=cw-this.r;
				this.direction=Math.PI-this.direction;
			}
			if(this.y<this.r){
				this.y=this.r;
				this.direction=-this.direction;
			}
			else if(this.y>=(ch-this.r)){
				this.y=ch-this.r;
				this.direction=-this.direction;
			}
		};

		/**
		 * 绘制圆形粒子
		 * @return {[type]} [description]
		 */
		var simpleItemFlag=false;
		Circle.prototype.draw=function(){
			cxt.beginPath();
			cxt.arc(this.x,this.y,this.r,0,360,false);
			cxt.closePath();
			cxt.fillStyle="#f66";
		
				simpleItem[0].onmouseover=function(){
					simpleItemFlag=true;
					
				};
				simpleItem[0].onmouseout=function(){
					// cxt.globalAlpha=0.2;
					simpleItemFlag=false;
				};
				
			
				if(simpleItemFlag){
					cxt.globalAlpha=1;
				}
				else if(this.x>x-50&&this.x<x+50&&this.y>y-50&&this.y<y+50){
					cxt.globalAlpha=1;
				}else{
					cxt.globalAlpha=0.2;

				}
				
			
		
			cxt.fill();
		};


		/**
		 * 矩形粒子对象
		 * @param {[type]} x 起点位置
		 * @param {[type]} y 起点位置
		 * @param {[type]} w 矩形宽
		 * @param {[type]} h 矩形长
		 */
		function Rect(x,y,w,h){
			this.x=x;
			this.y=y;
			this.w=w;
			this.h=h;
			this.x0=Math.random()*cw;	//正方形的中心坐标	为了旋转而设定
			this.y0=Math.random()*ch;	//正方形的中心坐标
			this.r=Math.sqrt(Math.pow(this.w/2,2)+Math.pow(this.h/2,2));
			this.speed=Math.random()*0.5+1;	//速度
			this.direction=Math.random()*Math.PI*2;	//方向
		}
		/**
		 * 更新粒子坐标
		 * @return {[type]} [description]
		 */
		Rect.prototype.update=function(){
			this.x0+=Math.cos(this.direction)*this.speed;
			this.y0+=Math.sin(this.direction)*this.speed;
			if(this.x0<this.r){
				this.x0=this.r;
				this.direction=Math.PI-this.direction;
			}else if(this.x0>cw-this.r){
				this.x0=cw-this.r;
				this.direction=Math.PI-this.direction;
			}
			if(this.y0<this.r){
				this.y0=this.r;
				this.direction=-this.direction;
			}else if(this.y0>ch-this.r){
				this.y0=ch-this.r;
				this.direction=-this.direction;
			}

		};
		/**
		 * 绘制正方形粒子
		 * @return {[type]} [description]
		 */
		var mark=false;
		Rect.prototype.draw=function(){

			cxt.save();
			cxt.fillStyle="#06c";
			cxt.translate(this.x0,this.y0);		//将坐标原点移至圆心  方便旋转
			cxt.rotate(i*Math.PI/180);
			cxt.beginPath();
				simpleItem[1].onmouseover=function(){
					mark=true;
					
				};
				simpleItem[1].onmouseout=function(){
					// cxt.globalAlpha=0.2;
					mark=false;
				};
				
			
				if(mark){
					cxt.globalAlpha=1;
				}
				else if(this.x>x-50&&this.x<x+50&&this.y>y-50&&this.y<y+50){
					cxt.globalAlpha=1;
				}else{
					cxt.globalAlpha=0.2;

				}
				
			cxt.fillRect(this.x,this.y,this.w,this.h);
			cxt.closePath();
			cxt.restore();
		};

		/**
		 * 等边三角形粒子 
		 * @param  {[type]} h 三角形高
		 * @return {[type]}   [description]
		 */
		function Triangle(b){
			this.b=b;
			this.x0=Math.random()*cw;
			this.y0=Math.random()*ch;
			this.speed=Math.random()*0.5+1;
			this.direction=Math.random()*Math.PI*2;
			this.r=this.b/2*Math.tan(30*Math.PI/180);
			console.log(this.r+"   "+this.b);
		}
		/**
		 * 中心更新
		 * @return {[type]} [description]
		 */
		
		Triangle.prototype.update=function(){
			this.x0+=Math.cos(this.direction)*this.speed;
			this.y0+=Math.sin(this.direction)*this.speed;
			if(this.x0<this.r){
				this.x0=this.r;
				this.direction=Math.PI-this.direction;
			}else if(this.x0>cw-this.r){
				this.x0=cw-this.r;
				this.direction=Math.PI-this.direction;
			}
			if(this.y0<this.r){
				this.y0=this.r;
				this.direction=-this.direction;
			}else if(this.y0>ch-this.r){
				this.y0=ch-this.r;
				this.direction=-this.direction;
			}
		};
		var mark1=false;
		Triangle.prototype.draw=function(){
			cxt.save();
			cxt.fillStyle="#86c";
			cxt.translate(this.x0,this.y0);
			cxt.rotate(i*Math.PI/180);
			cxt.beginPath();
			cxt.moveTo(-this.b/2,-this.r);
			cxt.lineTo(0,Math.sin(60*Math.PI/180)*this.b-this.r);
			cxt.lineTo(this.b/2,-this.r);
			
			
			cxt.closePath();
			simpleItem[2].onmouseover=function(){
					mark1=true;
					
				};
				simpleItem[2].onmouseout=function(){
					// cxt.globalAlpha=0.2;
					mark1=false;
				};
				
			
				if(mark1){
					cxt.globalAlpha=1;
				}
				else if(this.x>x-50&&this.x<x+50&&this.y>y-50&&this.y<y+50){
					cxt.globalAlpha=1;
				}else{
					cxt.globalAlpha=0.2;

				}
			cxt.fill();
			cxt.restore();

		};
		function addPratical(){
			var count=100;
			while(count--){
				var w=Math.random()*cw;
				var h=Math.random()*ch;
				circles.push(new Circle(w,h,5));
				rects.push(new Rect(-5,5,10,10));
				triangles.push(new Triangle(10));
			}

		}
	
		canvas.onmousemove=function(ev){
			var ev=ev||window.event;
			x=ev.pageX;
			y=ev.pageY;
			// console.log(x+"..."+y);
		};

		/**
		 * 在画布中绘制圆形粒子
		 * @return {[type]} [description]
		 */
		function loop(){
			requestAnimFrame(loop);
			i++;
			if(i>10000){
				i=0;
			}
			cxt.globalCompositeOperation="destination-out";
			cxt.fillStyle="rgba(0,0,0,1)";
			//透明度
			cxt.globalAlpha=1;
			cxt.fillRect(0,0,cw,ch);
			//显示重叠的部分
			cxt.globalCompositeOperation="lighter";
			var n=circles.length;
			while(n--){
				circles[n].draw();
				circles[n].update();
			}
			var n=rects.length;
			while(n--){
				rects[n].draw();
				rects[n].update();
			}

			var n=triangles.length;
			while(n--){
				triangles[n].draw();
				triangles[n].update();
			}
		}
		addPratical();
		loop();
		window.onresize=function(){
		    cw=canvasBg.clientWidth;
			ch=canvasBg.clientHeight;
			can.width=cw ;
			can.height=ch;
			circles.length=0;
			rects.length=0;
			triangles.length=0;
			addPratical();
		};
};

