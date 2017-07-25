/**
 * Created by lenovo on 2017/7/24.
 */

class Activiti {
    constructor(){
        this.addDom=null
        this.addArea=null
        this.paintArea=null
    }
    init(domId){
       let container=document.getElementById(domId)
       let html="<div class='addArea'><span class='add' draggable='true'>添加流程</span></div>"
           html+='<div id="paintArea"><svg id="paintSvg"></svg></div>'
        container.innerHTML=html
        this.addDom=document.querySelectorAll(".add")[0]
        this.addArea=document.querySelectorAll(".addArea")[0]
        this.addNode()

    }

    addNode(){//向绘图区域添加节点
        let addDom=this.addDom  //获取添加节点
        let paintArea=document.getElementById("paintArea")
        this.paintArea=paintArea
        let x
        let y
        let that=this
        paintArea.ondrop=function (e) {//在目标对象里释放
            let ev=window.event||e
            ev.preventDefault();
            let movedDom=document.createElement("div")
            movedDom.setAttribute("class","flowIcon")
            let innerH='<span>添加流程</span>'
                innerH+='<i class="dotL"></i><i class="dotR"></i><i class="dotT"></i><i class="dotB"></i>'
            movedDom.innerHTML=innerH
            document.getElementById("paintArea").appendChild(movedDom)
            let movedDomWidth=movedDom.offsetWidth
            let movedDomHeight=movedDom.offsetHeight
            movedDom.style.setProperty("left",(x-movedDomWidth/2)>0?(x-movedDomWidth/2)+"px":0)
            movedDom.style.setProperty("top",(y-movedDomHeight/2)>0?(y-movedDomHeight/2)+"px":0)
            that.moveFlowIcon(movedDom)//可移动节点
            that.paintArrow(movedDom)//画线
        }
        paintArea.ondragover=function (e) {//源对象悬停在目标对象上
            let ev=window.event||e
            ev.preventDefault();
            let mouseX=ev.pageX
            let mouseY=ev.pageY
            let paintAreaOffsetX=paintArea.offsetLeft
            let paintAreaOffsetY=paintArea.offsetTop
            x=mouseX-paintAreaOffsetX
            y=mouseY-paintAreaOffsetY
        }
        addDom.ondragstart=function (e) {//源对象开始被拖动
            let ev=window.event||e
        }
    }
    moveFlowIcon(movedDom){//可在绘图区域内移动节点
        let isDown=false
        let x
        let y
        let that=this
        let startX
        let startY
        const drag=function(ev) {

            let mouseX=ev.clientX
            let mouseY=ev.clientY
            //console.log(mouseX,mouseY)
            if(mouseX==startX&&mouseY==startY){
                return
            }
            let paintAreaOffsetX=that.paintArea.offsetLeft
            let paintAreaOffsetY=that.paintArea.offsetTop
            //获取滚动条的高度
            let scrollTop=that.paintArea.scrollTop
            let scrollLeft=that.paintArea.scrollLeft
            let windowScrollY=window.scrollY
            let windowScrollX=window.scrollX

            //console.log("top"+scrollTop)
            x=mouseX-paintAreaOffsetX+scrollLeft+windowScrollX
            y=mouseY-paintAreaOffsetY+scrollTop+windowScrollY
            let movedDomWidth=movedDom.offsetWidth
            let movedDomHeight=movedDom.offsetHeight
            movedDom.style.setProperty("left",(x-movedDomWidth/2)>0?(x-movedDomWidth/2)+"px":0)
            movedDom.style.setProperty("top",(y-movedDomHeight/2)>0?(y-movedDomHeight/2)+"px":0)

        }
        const dragOver=function () {
            //当移动超出视野范围之后，svg的宽高一起发生变化
            let allMoveDom=document.querySelectorAll(".flowIcon")
            let containerW=that.paintArea.offsetWidth
            let containerH=that.paintArea.offsetHeight
            let maxLeft=0
            let maxTop=0
            let svg=document.getElementById("paintSvg")
            for(let i=0;i<allMoveDom.length;i++){
                let left=allMoveDom[i].offsetLeft
                let width=allMoveDom[i].offsetWidth
                let top=allMoveDom[i].offsetTop
                let height=allMoveDom[i].offsetHeight
                //console.log(left+width,containerW)
                if(left+width>containerW){
                    if(left+width>maxLeft){
                        maxLeft=left+width
                    }
                }
                if(top+height>containerH){
                    if(top+height>maxTop){
                        maxTop=top+height
                    }
                }
            }
            //console.log("max="+maxLeft)
            if(maxLeft!=0){
                svg.style.width=maxLeft
            }
            if(maxTop!=0){
                svg.style.height=maxTop
            }
        }
        movedDom.onmousedown=function (e) {
            let ev=window.event||e
            ev.preventDefault();
            isDown=true
            startX=ev.clientX
            startY=ev.clientY
            document.onmousemove=function (e) {
                let ev=window.event||e
                if(isDown==true){
                    drag(ev)
                }
            }
            this.onmouseup=function (e) {
                let ev=window.event||e
                ev.preventDefault();
                isDown=false
                dragOver()
            }
            document.onmouseup=function (e) {
                let ev=window.event||e
                ev.preventDefault();
                isDown=false
                dragOver()
            }
        }



    }
   //画线
    paintArrow(moveDom){
        let isDown=false
        let startX
        let startY
        let svgContainer=document.getElementById("paintSvg")
        //当鼠标移动的时候绘图
        const paint=function (line,curNode,cursorNode) {
            let mouseX=cursorNode.clientX
            let mouseY=cursorNode.clientY
            let dotLeft=curNode.offsetLeft
            let dotTop=curNode.offsetTop
            let x=mouseX-dotLeft
            let y=mouseY-dotTop
            console.log(dotLeft,dotTop)
            console.log(x,y)
        }
        moveDom.addEventListener("mousedown",function (e) {
            let ev=window.event||e
            console.log(ev.target.nodeName)
            isDown=true
            if(ev.target.nodeName=='I'){
                document.onmousemove=null
                document.onmouseup=null
                this.onmouseup=null
                startX=ev.clientX
                startY=ev.clientY
                let line=document.createElement("line")
                svgContainer.appendChild(line)
                document.onmousemove=function (e) {
                    let ev=window.event||e
                    ev.preventDefault();
                    if(isDown==true){
                        console.log("huaxianmove")
                        paint(line,moveDom,ev)
                    }
                }
                this.onmouseup=function (e) {
                    let ev=window.event||e
                    ev.preventDefault();
                    isDown=false
                    //dragOver()
                }
                document.onmouseup=function (e) {
                    let ev=window.event||e
                    ev.preventDefault();
                    isDown=false
                    //dragOver()
                }
            }
        })
    }



}

export default Activiti

