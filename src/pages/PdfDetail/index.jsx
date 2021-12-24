import React, { Component } from 'react'
import { Document, Page, pdfjs} from 'react-pdf';
import AlloyFinger from 'alloyfinger'
import './pdfDetail.scss'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default class PdfDetail extends Component {
    
    state={
        pageNumber:1,
        scale:1,
        lastZoom:1
    }

    
    componentDidMount(){
        this.init()
    }
    //实现缩放功能
    init=()=>{
        var el = document.getElementById('document')
        let that=this;
        var af=new AlloyFinger(el,{
            pinch:function(e){
                let zoom=that.state.scale+e.zoom-that.state.lastZoom
                //最小缩小比例并且继续缩小
                if(that.state.scale<0.8&&e.zoom-that.state.lastZoom<0) return;
                that.setState({
                    scale:zoom,
                    // 用来记录上一次的zoom
                    lastZoom:e.zoom
                })
            },
            multipointEnd: function () {
                //每次结束手势将lastzoom恢复
                that.setState({
                    lastZoom:1
                })
            },
        })
    }
    render() {
        return (
            <div id='document' style={{transform:'scale('+this.state.scale+')'}}>
                <Document
                    file={this.props.history.location.state.file}
                    >
                    <Page pageNumber={this.state.pageNumber} />
                </Document>
            </div>
        )
    }
}
