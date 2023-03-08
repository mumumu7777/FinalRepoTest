(function(){"use strict";var t={4733:function(t,e,n){var a=n(9963),o=n(6252);const s={id:"app"};function l(t,e,n,a,l,i){const c=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",s,[(0,o.Wm)(c)])}var i={name:"App",components:{},methods:{}},c=n(3744);const r=(0,c.Z)(i,[["render",l]]);var d=r,u=n(2201),p=n(8433),m=n(3577);const h=t=>((0,o.dD)("data-v-256c3041"),t=t(),(0,o.Cn)(),t),v={class:"row mx-auto"},f={class:"product-card row"},g={class:"col-12"},y={class:"col-12"},b={class:"col-12"},S=["onClick"],C=h((()=>(0,o._)("br",null,null,-1))),w={class:"mt-5"},_={class:"input-group mb-3 form-inline"};function x(t,e,n,s,l,i){const c=(0,o.up)("ShoppingCart"),r=(0,o.up)("router-link"),d=(0,o.up)("VueTwZipCodeSelector"),u=(0,o.up)("loading"),p=(0,o.up)("Layout01");return(0,o.wg)(),(0,o.j4)(p,null,{contents:(0,o.w5)((()=>[(0,o.Wm)(c,{ref:"shoppingCart"},null,512),(0,o._)("div",v,[(0,o._)("div",{class:(0,m.C_)(["text-center",i.customClass()])},"商品:",2),(0,o._)("div",null,[(0,o.Uk)(" 搜尋: "),(0,o.wy)((0,o._)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>l.searchText=t)},null,512),[[a.nr,l.searchText]]),(0,o._)("button",{class:"pointer",onClick:e[1]||(e[1]=t=>i.search())},"搜尋結果")]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.products,((t,e)=>((0,o.wg)(),(0,o.iD)("div",{key:t.id},[(0,o._)("div",f,[(0,o._)("div",g,"編號: "+(0,m.zw)(e+1),1),(0,o._)("div",y,"商品名稱: "+(0,m.zw)(t.name),1),(0,o._)("div",b,"商品價格: "+(0,m.zw)(t.price),1),(0,o._)("button",{class:"col-1 btn btn-danger pointer",onClick:e=>i.addToCart(t,3)}," 加入一個 ",8,S),C])])))),128)),(0,o._)("div",w,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.cartsSelect,((t,e)=>((0,o.wg)(),(0,o.iD)("div",{key:t.id},[(0,o._)("div",null,"商品名稱: "+(0,m.zw)(t.name)+" 數量: "+(0,m.zw)(t.qty),1)])))),128))]),(0,o.Wm)(r,{to:l.notFoundLink},{default:(0,o.w5)((()=>[(0,o.Uk)("購物車")])),_:1},8,["to"])]),(0,o._)("div",_,[(0,o.Wm)(d,{onGetSelectedZone:i.getSelectedZone},null,8,["onGetSelectedZone"]),(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>l.adressinput=t),type:"text",class:"form-control",onBlur:e[3]||(e[3]=(...t)=>i.getAdressInput&&i.getAdressInput(...t))},null,544),[[a.nr,l.adressinput]])]),(0,o.Wm)(u,{active:l.loading},null,8,["active"])])),_:1})}n(7658);var $={data(){return{notFoundLink:"/notfound",headers:{},products:null,searchText:"",loading:!1,adressval:null,adressinput:""}},setup(){const t=(0,u.tv)(),e=((0,u.yj)(),()=>{t.push("/notfound")});return{toNotFound:e}},mounted(){this.GetProducts()},methods:{goNotFound(){this.toNotFound()},customClass(){return"test"},search(){alert(this.searchText)},async GetProducts(){await this.$axios.get("api/ShoppingCart/GetProducts").then((t=>{t.data&&(this.products=t.data.data,console.log(this.products))})).catch((t=>{console.log(err.response.data)}))},async addToCart(t,e){this.$refs.shoppingCart.addToCart(t,e)},async getSelectedZone(t){this.adressval=JSON.parse(JSON.stringify(t.value)),console.log(this.adressval)},async getAdressInput(){console.log(this.adressinput)}},components:{}};const k=(0,c.Z)($,[["render",x],["__scopeId","data-v-256c3041"]]);var T=k;function I(t,e,n,a,s,l){const i=(0,o.up)("loading"),c=(0,o.up)("Layout01");return(0,o.wg)(),(0,o.j4)(c,null,{contents:(0,o.w5)((()=>[(0,o.Uk)(" 此頁為結帳結果頁，將綠界交易資訊傳回顯示 "),(0,o.Wm)(i,{active:s.loading},null,8,["active"])])),_:1})}var F={data(){return{notFoundLink:"/notfound",loading:!1,trendModels:null,errSweetAlert:{title:"錯誤",icon:"error",confirmButtonText:"確定",confirmButtonColor:"#41b882"},successSweetAlert:{title:"成功",icon:"success",confirmButtonText:"確定",confirmButtonColor:"#41b882"}}},setup(){const t=(0,u.tv)(),e=((0,u.yj)(),()=>{t.push("/homepage")});return{toHomePage:e}},methods:{},components:{}};const P=(0,c.Z)(F,[["render",I]]);var D=P;const B={class:"test123"};function L(t,e,n,a,s,l){return(0,o.wg)(),(0,o.iD)("div",B,"Not Found 404")}var N={name:"NotFound"};const U=(0,c.Z)(N,[["render",L]]);var M=U;const A=t=>((0,o.dD)("data-v-54edac13"),t=t(),(0,o.Cn)(),t),R={class:"row mx-auto"},O={class:"product-card row"},Z={class:"col-12"},j={class:"col-12"},V={class:"col-12"},W=["onClick"],z=A((()=>(0,o._)("br",null,null,-1))),H={class:"mt-5"},Q={class:"input-group mb-3 form-inline"};function E(t,e,n,s,l,i){const c=(0,o.up)("CashView"),r=(0,o.up)("router-link"),d=(0,o.up)("VueTwZipCodeSelector"),u=(0,o.up)("loading"),p=(0,o.up)("Layout01");return(0,o.wg)(),(0,o.j4)(p,null,{contents:(0,o.w5)((()=>[(0,o.Wm)(c,{ref:"CashView"},null,512),(0,o._)("div",R,[(0,o._)("div",{class:(0,m.C_)(["text-center",i.customClass()])},"商品:",2),(0,o._)("div",null,[(0,o.Uk)(" 搜尋: "),(0,o.wy)((0,o._)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>l.searchText=t)},null,512),[[a.nr,l.searchText]]),(0,o._)("button",{class:"pointer",onClick:e[1]||(e[1]=t=>i.search())},"搜尋結果")]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.products,((t,e)=>((0,o.wg)(),(0,o.iD)("div",{key:t.id},[(0,o._)("div",O,[(0,o._)("div",Z,"編號: "+(0,m.zw)(e+1),1),(0,o._)("div",j,"商品名稱: "+(0,m.zw)(t.name),1),(0,o._)("div",V,"商品價格: "+(0,m.zw)(t.price),1),(0,o._)("button",{class:"col-1 btn btn-danger pointer",onClick:e=>i.addToCart(t,3)}," 加入一個 ",8,W),z])])))),128)),(0,o._)("div",H,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.cartsSelect,((t,e)=>((0,o.wg)(),(0,o.iD)("div",{key:t.id},[(0,o._)("div",null,"商品名稱: "+(0,m.zw)(t.name)+" 數量: "+(0,m.zw)(t.qty),1)])))),128))]),(0,o.Wm)(r,{to:l.notFoundLink},{default:(0,o.w5)((()=>[(0,o.Uk)("購物車")])),_:1},8,["to"])]),(0,o._)("div",Q,[(0,o.Wm)(d,{onGetSelectedZone:i.getSelectedZone},null,8,["onGetSelectedZone"]),(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>l.adressinput=t),type:"text",class:"form-control",onBlur:e[3]||(e[3]=(...t)=>i.getAdressInput&&i.getAdressInput(...t))},null,544),[[a.nr,l.adressinput]])]),(0,o.Wm)(u,{active:l.loading},null,8,["active"])])),_:1})}const G=t=>((0,o.dD)("data-v-655d7360"),t=t(),(0,o.Cn)(),t),J={class:"container mt-4 p-0"},K={class:"row px-md-4 px-2 pt-4"},Y={class:"col-lg-8"},q=G((()=>(0,o._)("p",{class:"pb-2 fw-bold"},"Order",-1))),X={class:"card"},tt={class:"card-scroll-x"},et={class:"table-responsive px-md-4 px-2 pt-3"},nt={class:"table table-borderless"},at=G((()=>(0,o._)("tr",{class:""},[(0,o._)("td",null,[(0,o._)("div",{class:"d-flex align-items-center"},[(0,o._)("div",null,[(0,o._)("img",{class:"pic",src:"https://images.pexels.com/photos/7322083/pexels-photo-7322083.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",alt:""})]),(0,o._)("div",{class:"ps-3 d-flex flex-column"},[(0,o._)("p",{class:"fw-bold"},[(0,o.Uk)(" Sportswear"),(0,o._)("span",{class:"ps-1"},"Heritage"),(0,o._)("span",{class:"ps-1"},"Windrunner")])])])]),(0,o._)("td",null,[(0,o._)("div",{class:"d-flex align-items-center"},[(0,o._)("span",{class:"pe-3 text-muted"},"數量"),(0,o._)("span",{class:"pe-3"},[(0,o._)("input",{class:"ps-2",type:"number",value:"2"})])])])],-1))),ot={class:"d-flex align-items-center"},st=G((()=>(0,o._)("div",null,[(0,o._)("img",{class:"pic",src:"https://images.pexels.com/photos/7322083/pexels-photo-7322083.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",alt:""})],-1))),lt={class:"ps-3 d-flex flex-column"},it={class:"fw-bold ps-1"},ct={class:"d-flex align-items-center"},rt=G((()=>(0,o._)("span",{class:"pe-2 text-muted"},"數量",-1))),dt={class:"btn btn-link px-2 pointer"},ut={class:"pe-3"},pt=["onUpdate:modelValue","onBlur"],mt={class:"btn btn-link px-2 pointer"},ht={class:"ms-4 pointer"},vt=["onClick"],ft={class:"col-lg-4 payment-summary"},gt=G((()=>(0,o._)("p",{class:"fw-bold pt-lg-0 pt-4 pb-2"},"購買資訊",-1))),yt={class:"card px-md-3 px-2 pt-4"},bt={class:"unregistered mb-4"},St={class:"py-1"},Ct=G((()=>(0,o._)("span",null,"地址:",-1))),wt={class:"d-flex justify-content-between pb-3"},_t=["innerHTML"],xt={class:"d-flex justify-content-between b-bottom"},$t={class:"d-flex flex-column b-bottom"},kt=G((()=>(0,o._)("div",{class:"d-flex justify-content-between py-3"},[(0,o._)("small",{class:"text-muted"},"折價券折扣"),(0,o._)("p",null,"$122")],-1))),Tt=G((()=>(0,o._)("div",{class:"d-flex justify-content-between pb-3"},[(0,o._)("small",{class:"text-muted"},"以折扣金額"),(0,o._)("p",null,"$22")],-1))),It={class:"d-flex justify-content-between"},Ft=G((()=>(0,o._)("small",{class:"text-muted"},"總金額",-1))),Pt={class:"my-3"},Dt=G((()=>(0,o._)("p",{class:"btntext"},"購買",-1))),Bt=[Dt];function Lt(t,e,n,s,l,i){const c=(0,o.up)("font-awesome-icon"),r=(0,o.up)("VueTwZipCodeSelector");return(0,o.wg)(),(0,o.iD)("div",J,[(0,o._)("div",K,[(0,o._)("div",Y,[q,(0,o._)("div",X,[(0,o._)("div",tt,[(0,o._)("div",et,[(0,o._)("table",nt,[(0,o._)("tbody",null,[at,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.cartsSelect,((t,e)=>((0,o.wg)(),(0,o.iD)("tr",{class:"",key:t.Id},[(0,o._)("td",null,[(0,o._)("div",ot,[st,(0,o._)("div",lt,[(0,o._)("p",it,(0,m.zw)(t.Name),1)])])]),(0,o._)("td",null,[(0,o._)("div",ct,[rt,(0,o._)("button",dt,[(0,o.Wm)(c,{icon:"fas fa-minus",onClick:(0,a.iM)((n=>i.addToCart(t,1,`.count-input-${e}`)),["stop"])},null,8,["onClick"])]),(0,o._)("span",ut,[(0,o.wy)((0,o._)("input",{class:(0,m.C_)(["qtyinput text-center",`count-input-${e}`]),"onUpdate:modelValue":e=>t.Qty=e,type:"input",onBlur:(0,a.iM)((n=>i.addToCart(t,2,`.count-input-${e}`)),["stop"])},null,42,pt),[[a.nr,t.Qty]])]),(0,o._)("button",mt,[(0,o.Wm)(c,{icon:"fas fa-plus",onClick:(0,a.iM)((n=>i.addToCart(t,0,`.count-input-${e}`)),["stop"])},null,8,["onClick"])]),(0,o._)("div",ht,[(0,o._)("a",{class:"text-dark",onClick:(0,a.iM)((e=>i.removeCartItem(t)),["stop"])},[(0,o.Wm)(c,{icon:"fas fa-trash"})],8,vt)])])])])))),128))])])])])])]),(0,o._)("div",ft,[gt,(0,o._)("div",yt,[(0,o._)("div",bt,[(0,o._)("span",St,[Ct,(0,o.Wm)(r,{onGetSelectedZone:i.getSelectedZone,class:"address-coustomize ms-3"},null,8,["onGetSelectedZone"]),(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>l.adressinput=t),type:"text",class:"form-control",onBlur:e[1]||(e[1]=(...t)=>i.getAdressInput&&i.getAdressInput(...t))},null,544),[[a.nr,l.adressinput]])])]),(0,o._)("div",wt,[(0,o._)("small",{innerHTML:l.couponmessage,class:"text-muted"},null,8,_t)]),(0,o._)("div",xt,[(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>l.couponinput=t),onBlur:e[3]||(e[3]=(0,a.iM)(((...t)=>i.getCoupon&&i.getCoupon(...t)),["stop"])),type:"text",class:"ps-2",placeholder:"折價券代碼"},null,544),[[a.nr,l.couponinput]])])]),(0,o._)("div",$t,[kt,Tt,(0,o._)("div",It,[Ft,(0,o._)("p",null,"$"+(0,m.zw)(this.getTotal),1)])]),(0,o._)("div",Pt,[(0,o._)("span",null,[(0,o._)("button",{type:"button",class:"btn btn-lg btn-block btn-success p-1 col-12",onClick:e[4]||(e[4]=(0,a.iM)(((...t)=>i.cartSubmit&&i.cartSubmit(...t)),["stop"]))},Bt)])])])])])}var Nt={data(){return{notFoundLink:"/notfound",headers:{},products:null,cartsSelect:[],searchText:"",paymentForm:"",adressval:null,adressinput:"",couponinput:"",couponmessage:"",coupondiscountdata:"",couponID:"",loading:!1,delSweetConfirm:{title:"要刪除此項目嗎",icon:"warning",showCancelButton:!0,confirmButtonColor:"#ff7674",cancelButtonColor:"#777",confirmButtonText:"刪除",cancelButtonText:"取消"},buySweetConfirm:{title:"確定要購買嗎",icon:"warning",showCancelButton:!0,confirmButtonColor:"#41b882",cancelButtonColor:"#777",confirmButtonText:"購買",cancelButtonText:"取消"},successSweetAlert:{title:"成功",icon:"success",confirmButtonText:"確定",confirmButtonColor:"#41b882"},errSweetAlert:{title:"錯誤",icon:"error",confirmButtonText:"確定",confirmButtonColor:"#41b882"}}},setup(){const t=(0,u.tv)(),e=((0,u.yj)(),()=>{t.push("/notfound")});return{toNotFound:e}},mounted(){this.getStorageCart()},computed:{getTotal(){if(this.cartsSelect.length>0){let t=this.cartsSelect.map((t=>t.Price*t.Qty)).reduce(((t,e)=>t+e));return this.coupondiscountdata&&(this.coupondiscountdata>1?t-=parseInt(this.coupondiscountdata):t=parseInt(t*this.coupondiscountdata)),t}}},methods:{saveLocalStorage(t,e){localStorage.setItem(t,JSON.stringify(e))},getlocalStorage(t){this[t]=JSON.parse(localStorage.getItem(t))},goNotFound(){this.toNotFound()},async getAdressInput(){console.log(this.adressinput)},async getSelectedZone(t){this.adressval=JSON.parse(JSON.stringify(t.value)),console.log(this.adressval)},getCoupon(){this.couponinput?this.$axios.get(`api/ShoppingCart/CatchCoupon?CouponCode=${this.couponinput}`).then((t=>{204!=t.status&&200!=t.status||(this.coupondiscountdata=t.data.data.discount,this.couponmessage=`<span class="text-success">${t.data.messsage}</span>`,this.couponID=t.data.data.id)})).catch((t=>{this.couponmessage=`<span class="text-danger">${t.response.data.messsage}</span>`,this.coupondiscountdata="",this.couponinput=""})):(this.coupondiscountdata="",this.couponmessage="")},getStorageCart(){this.getlocalStorage("cartsSelect"),this.cartsSelect||(this.cartsSelect=[])},rmStorageCart(){localStorage.removeItem("cartsSelect"),this.cartsSelect=[]},async addToCart(t,e,n){if(3!=e){let a=document.querySelector(n),o=a.value,s=this.cartsSelect.indexOf(t);if(console.log("findIndex",s),console.log("input",a),console.log("count",o),1==e&&1==o)return void this.removeCartItem(t);if(2==e&&0==o)return void this.removeCartItem(t,!0);switch(e){case 0:this.cartsSelect[s].Qty++;break;case 1:this.cartsSelect[s].Qty--;break;case 2:this.cartsSelect[s].Qty=o;break}this.saveLocalStorage("cartsSelect",this.cartsSelect)}else{let e=this.cartsSelect.find((e=>e.Id==t.id));if(console.log("findProduct add",e),e){let t=this.cartsSelect.indexOf(e);this.cartsSelect[t].Qty++}else this.cartsSelect.push({Id:t.id,Qty:1,Name:t.name,Price:t.price});this.saveLocalStorage("cartsSelect",this.cartsSelect)}console.log(this.cartsSelect)},async removeCartItem(t,e){let n=this.cartsSelect.indexOf(t);n>-1&&this.$swal.fire(this.delSweetConfirm).then((t=>{t.isConfirmed?(this.cartsSelect.splice(n,1),this.saveLocalStorage("cartsSelect",this.cartsSelect)):e&&this.getlocalStorage("cartsSelect")}))},async cartSubmit(){await this.$swal.fire(this.buySweetConfirm).then((t=>{if(t.isConfirmed){let t={MemberId:1,State:0,Total:this.getTotal,CartProducts:Array.from(this.cartsSelect),CouponCode:this.couponinput,CouponData:{UsedCouponID:this.couponID,CouponCode:this.couponinput,Discount:this.coupondiscountdata},Adress:{Name:this.adressval.name,ZipCode:this.adressval.zipCode,County:this.adressval.county,CountyName:this.adressval.countyName,InputRegion:this.adressval.adressinput}};this.loading=!0,this.$axios.post("api/ShoppingCart/SaveShoppingCart",t).then((t=>{204!=t.status&&200!=t.status||null!==t.data&void 0!==t.data&&(this.rmStorageCart(),this.successSweetAlert.text=t.data.messsage,this.$swal.fire(this.successSweetAlert),this.successSweetAlert.text="",this.paymentForm=this.buildPaymentForm(t.data.data.formData),this.loading=!1,this.$nextTick((()=>{document.getElementById("payment").submit(),this.paymentForm=""})))})).catch((t=>{console.log(t.response.data),this.errSweetAlert.text=t.response.data.messsage||"其他錯誤",this.$swal.fire(this.errSweetAlert),this.errSweetAlert.text="",this.loading=!1}))}}))},buildPaymentForm(t){let e="";return e+=`<form action="${t.url}" method="post" id="payment">`,e+=`<input type="hidden" name="MerchantID" value="${t.merchantID}"/>`,e+=`<input type="hidden" name="MerchantTradeNo" value="${t.merchantTradeNo}"/>`,e+=`<input type="hidden" name="MerchantTradeDate" value="${t.merchantTradeDate}"/>`,e+=`<input type="hidden" name="PaymentType" value="${t.paymentType}"/>`,e+=`<input type="hidden" name="TotalAmount" value="${t.totalAmount}"/>`,e+=`<input type="hidden" name="TradeDesc" value="${t.tradeDesc}"/>`,e+=`<input type="hidden" name="ItemName" value="${t.itemName}"/>`,e+=`<input type="hidden" name="ReturnURL" value="${t.returnURL}"/>`,e+=`<input type="hidden" name="ChoosePayment" value="${t.choosePayment}"/>`,e+=`<input type="hidden" name="CheckMacValue" value="${t.checkMacValue}"/>`,e+=`<input type="hidden" name="EncryptType" value="${t.encryptType}"/>`,t.storeID&&(e+=`<input type="hidden" name="StoreID" value="${t.storeID}"/>`),t.clientBackURL&&(e+=`<input type="hidden" name="ClientBackURL" value="${t.clientBackURL}"/>`),t.itemURL&&(e+=`<input type="hidden" name="ItemURL" value="${t.itemURL}"/>`),t.remark&&(e+=`<input type="hidden" name="Remark" value="${t.remark}"/>`),t.chooseSubPayment&&(e+=`<input type="hidden" name="ChooseSubPayment" value="${t.chooseSubPayment}"/>`),t.orderResultURL&&(e+=`<input type="hidden" name="OrderResultURL" value="${t.orderResultURL}"/>`),t.needExtraPaidInfo&&(e+=`<input type="hidden" name="NeedExtraPaidInfo" value="${t.needExtraPaidInfo}"/>`),t.ignorePayment&&(e+=`<input type="hidden" name="IgnorePayment" value="${t.ignorePayment}"/>`),t.platformID&&(e+=`<input type="hidden" name="PlatformID" value="${t.platformID}"/>`),t.invoiceMark&&(e+=`<input type="hidden" name="InvoiceMark" value="${t.invoiceMark}"/>`),t.customField1&&(e+=`<input type="hidden" name="CustomField1" value="${t.customField1}"/>`),t.customField2&&(e+=`<input type="hidden" name="CustomField2" value="${t.customField2}"/>`),t.customField3&&(e+=`<input type="hidden" name="CustomField3" value="${t.customField3}"/>`),t.customField4&&(e+=`<input type="hidden" name="CustomField4" value="${t.customField4}"/>`),t.language&&(e+=`<input type="hidden" name="Language" value="${t.language}"/>`),t.unionPay&&(e+=`<input type="hidden" name="UnionPay" value="${t.unionPay}"/>`),e+="</form>",e}},components:{}};const Ut=(0,c.Z)(Nt,[["render",Lt],["__scopeId","data-v-655d7360"]]);var Mt=Ut,At={data(){return{notFoundLink:"/notfound",headers:{},products:null,searchText:"",loading:!1,adressval:null,adressinput:""}},setup(){const t=(0,u.tv)(),e=((0,u.yj)(),()=>{t.push("/notfound")});return{toNotFound:e}},mounted(){this.GetProducts()},methods:{goNotFound(){this.toNotFound()},customClass(){return"test"},search(){alert(this.searchText)},async GetProducts(){await this.$axios.get("api/ShoppingCart/GetProducts").then((t=>{t.data&&(this.products=t.data.data,console.log(this.products))})).catch((t=>{console.log(err.response.data)}))},async addToCart(t,e){this.$refs.CashView.addToCart(t,e)},async getSelectedZone(t){this.adressval=JSON.parse(JSON.stringify(t.value)),console.log(this.adressval)},async getAdressInput(){console.log(this.adressinput)}},components:{}};const Rt=(0,c.Z)(At,[["render",E],["__scopeId","data-v-54edac13"]]);var Ot=Rt;p.Z.defaults.baseURL="/";const Zt=[{path:"/",redirect:"/Homepage2"},{path:"/homepage",component:T,name:"homepage"},{path:"/checkoutreport",component:D,name:"checkoutreport"},{path:"/Homepage2",component:Ot,name:"Homepage2"},{path:"/:pathMatch(.*)*",name:"NotFound",component:M,props:t=>t.params}],jt=(0,u.p7)({history:(0,u.PO)(),routes:Zt});jt.afterEach(((t,e)=>{let n=document.body.scrollTop;if(0!==n)return void(document.body.scrollTop=0);let a=document.documentElement.scrollTop;0!==a&&(document.documentElement.scrollTop=0)}));var Vt=jt,Wt=(n(8877),n(3636)),zt=n(7810),Ht=n(9417),Qt=n(3982),Et=n.n(Qt),Gt=n(2369),Jt=n.n(Gt);const Kt=t=>((0,o.dD)("data-v-4d8c17d6"),t=t(),(0,o.Cn)(),t),Yt={class:"container-fluid layout01 px-0"},qt=Kt((()=>(0,o._)("div",{class:"header w-100"},"網頁Header",-1))),Xt=Kt((()=>(0,o._)("div",{class:"footer w-100"},"網頁Footer",-1)));function te(t,e,n,a,s,l){return(0,o.wg)(),(0,o.iD)("div",Yt,[qt,(0,o.WI)(t.$slots,"contents",{class:"body w-100"},void 0,!0),Xt])}var ee={components:{}};const ne=(0,c.Z)(ee,[["render",te],["__scopeId","data-v-4d8c17d6"]]);var ae=ne;const oe=t=>((0,o.dD)("data-v-2af56bc6"),t=t(),(0,o.Cn)(),t),se={class:"row d-flex justify-content-center align-items-center h-100 w-75 mt-5 mx-auto"},le={class:"col-10"},ie=(0,o.uE)('<div class="d-flex justify-content-between align-items-center mb-4" data-v-2af56bc6><h3 class="fw-normal mb-0 text-black" data-v-2af56bc6>Shopping Cart</h3><div data-v-2af56bc6><p class="mb-0" data-v-2af56bc6><span class="text-muted" data-v-2af56bc6>Sort by:</span><a class="text-body" data-v-2af56bc6>price <i class="fas fa-angle-down mt-1" data-v-2af56bc6></i></a></p></div></div>',1),ce={class:"card rounded-3 mb-4"},re={class:"card-body p-4"},de=oe((()=>(0,o._)("div",{class:"col-md-2 col-lg-2 col-xl-2"},[(0,o._)("img",{src:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp",class:"img-fluid rounded-3",alt:"Cotton T-shirt"})],-1))),ue={class:"col-md-3 col-lg-3 col-xl-3"},pe={class:"lead fw-normal mb-2"},me={class:"col-md-3 col-lg-3 col-xl-2 d-flex"},he={class:"btn btn-link px-2 pointer"},ve=["onUpdate:modelValue","onBlur"],fe={class:"btn btn-link px-2 pointer"},ge={class:"col-md-3 col-lg-2 col-xl-2 offset-lg-1"},ye={class:"mb-0"},be={class:"col-md-1 col-lg-1 col-xl-1 text-end pointer"},Se=["onClick"],Ce=(0,o.uE)('<div class="card mb-4" data-v-2af56bc6><div class="card-body p-4 d-flex flex-row" data-v-2af56bc6><div class="form-outline flex-fill" data-v-2af56bc6><input type="text" id="form1" class="form-control form-control-lg" data-v-2af56bc6><label class="form-label" for="form1" data-v-2af56bc6>Discound code</label></div><button type="button" class="btn btn-outline-warning btn-lg ms-3" data-v-2af56bc6> Apply </button></div></div>',1),we={class:"card"},_e={class:"card-body"},xe={class:"btn btn-lg d-inline-block float-start",style:{"pointer-events":"none"}},$e=["innerHTML"];function ke(t,e,n,s,l,i){const c=(0,o.up)("font-awesome-icon"),r=(0,o.up)("loading");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",se,[(0,o._)("div",le,[ie,(0,o._)("div",ce,[(0,o._)("div",re,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.cartsSelect,((t,e)=>((0,o.wg)(),(0,o.iD)("div",{class:"row mt-3 d-flex justify-content-between align-items-center",key:t.Id},[de,(0,o._)("div",ue,[(0,o._)("p",pe,(0,m.zw)(t.Name),1)]),(0,o._)("div",me,[(0,o._)("button",he,[(0,o.Wm)(c,{icon:"fas fa-minus",onClick:(0,a.iM)((n=>i.addToCart(t,1,`.count-input-${e}`)),["stop"])},null,8,["onClick"])]),(0,o.wy)((0,o._)("input",{class:(0,m.C_)(["form-control form-control-sm",`count-input-${e}`]),min:"0",default:"1","onUpdate:modelValue":e=>t.Qty=e,type:"number",onBlur:(0,a.iM)((n=>i.addToCart(t,2,`.count-input-${e}`)),["stop"])},null,42,ve),[[a.nr,t.Qty]]),(0,o._)("button",fe,[(0,o.Wm)(c,{icon:"fas fa-plus",onClick:(0,a.iM)((n=>i.addToCart(t,0,`.count-input-${e}`)),["stop"])},null,8,["onClick"])])]),(0,o._)("div",ge,[(0,o._)("h5",ye,"$"+(0,m.zw)(t.Price*t.Qty),1)]),(0,o._)("div",be,[(0,o._)("a",{class:"text-danger",onClick:(0,a.iM)((e=>i.removeCartItem(t)),["stop"])},[(0,o.Wm)(c,{icon:"fas fa-trash"})],8,Se)])])))),128))])]),Ce,(0,o._)("div",we,[(0,o._)("div",_e,[(0,o._)("span",xe," 總金額: "+(0,m.zw)(this.getTotal),1),(0,o._)("button",{type:"button",class:"btn btn-warning btn-block btn-lg pointer float-end",onClick:e[0]||(e[0]=(0,a.iM)(((...t)=>i.cartSubmit&&i.cartSubmit(...t)),["stop"]))}," 購買 ")])])])]),(0,o._)("div",{innerHTML:l.paymentForm},null,8,$e),(0,o.Wm)(r,{active:l.loading},null,8,["active"])],64)}var Te={data(){return{notFoundLink:"/notfound",headers:{},products:null,cartsSelect:[],searchText:"",paymentForm:"",loading:!1,delSweetConfirm:{title:"要刪除此項目嗎",icon:"warning",showCancelButton:!0,confirmButtonColor:"#ff7674",cancelButtonColor:"#777",confirmButtonText:"刪除",cancelButtonText:"取消"},buySweetConfirm:{title:"確定要購買嗎",icon:"warning",showCancelButton:!0,confirmButtonColor:"#41b882",cancelButtonColor:"#777",confirmButtonText:"購買",cancelButtonText:"取消"},successSweetAlert:{title:"成功",icon:"success",confirmButtonText:"確定",confirmButtonColor:"#41b882"},errSweetAlert:{title:"錯誤",icon:"error",confirmButtonText:"確定",confirmButtonColor:"#41b882"}}},setup(){const t=(0,u.tv)(),e=((0,u.yj)(),()=>{t.push("/notfound")});return{toNotFound:e}},mounted(){this.getStorageCart()},computed:{getTotal(){if(this.cartsSelect.length>0){let t=this.cartsSelect.map((t=>t.Price*t.Qty)).reduce(((t,e)=>t+e));return t}}},methods:{saveLocalStorage(t,e){localStorage.setItem(t,JSON.stringify(e))},getlocalStorage(t){this[t]=JSON.parse(localStorage.getItem(t))},goNotFound(){this.toNotFound()},getStorageCart(){this.getlocalStorage("cartsSelect"),this.cartsSelect||(this.cartsSelect=[])},rmStorageCart(){localStorage.removeItem("cartsSelect"),this.cartsSelect=[]},async addToCart(t,e,n){if(3!=e){let a=document.querySelector(n),o=a.value,s=this.cartsSelect.indexOf(t);if(console.log("findIndex",s),console.log("input",a),console.log("count",o),1==e&&1==o)return void this.removeCartItem(t);if(2==e&&0==o)return void this.removeCartItem(t,!0);switch(e){case 0:this.cartsSelect[s].Qty++;break;case 1:this.cartsSelect[s].Qty--;break;case 2:this.cartsSelect[s].Qty=o;break}this.saveLocalStorage("cartsSelect",this.cartsSelect)}else{let e=this.cartsSelect.find((e=>e.Id==t.id));if(console.log("findProduct add",e),e){let t=this.cartsSelect.indexOf(e);this.cartsSelect[t].Qty++}else this.cartsSelect.push({Id:t.id,Qty:1,Name:t.name,Price:t.price});this.saveLocalStorage("cartsSelect",this.cartsSelect)}console.log(this.cartsSelect)},async removeCartItem(t,e){let n=this.cartsSelect.indexOf(t);n>-1&&this.$swal.fire(this.delSweetConfirm).then((t=>{t.isConfirmed?(this.cartsSelect.splice(n,1),this.saveLocalStorage("cartsSelect",this.cartsSelect)):e&&this.getlocalStorage("cartsSelect")}))},async cartSubmit(){await this.$swal.fire(this.buySweetConfirm).then((t=>{if(t.isConfirmed){let t={MemberId:1,State:0,CartProducts:Array.from(this.cartsSelect)};this.loading=!0,this.$axios.post("api/ShoppingCart/SaveShoppingCart",t).then((t=>{204!=t.status&&200!=t.status||null!==t.data&void 0!==t.data&&(this.rmStorageCart(),this.successSweetAlert.text=t.data.messsage,this.$swal.fire(this.successSweetAlert),this.successSweetAlert.text="",this.paymentForm=this.buildPaymentForm(t.data.data.formData),this.loading=!1,this.$nextTick((()=>{document.getElementById("payment").submit(),this.paymentForm=""})))})).catch((t=>{console.log(t.response.data),this.errSweetAlert.text=t.response.data.messsage||"其他錯誤",this.$swal.fire(this.errSweetAlert),this.errSweetAlert.text="",this.loading=!1}))}}))},buildPaymentForm(t){let e="";return e+=`<form action="${t.url}" method="post" id="payment">`,e+=`<input type="hidden" name="MerchantID" value="${t.merchantID}"/>`,e+=`<input type="hidden" name="MerchantTradeNo" value="${t.merchantTradeNo}"/>`,e+=`<input type="hidden" name="MerchantTradeDate" value="${t.merchantTradeDate}"/>`,e+=`<input type="hidden" name="PaymentType" value="${t.paymentType}"/>`,e+=`<input type="hidden" name="TotalAmount" value="${t.totalAmount}"/>`,e+=`<input type="hidden" name="TradeDesc" value="${t.tradeDesc}"/>`,e+=`<input type="hidden" name="ItemName" value="${t.itemName}"/>`,e+=`<input type="hidden" name="ReturnURL" value="${t.returnURL}"/>`,e+=`<input type="hidden" name="ChoosePayment" value="${t.choosePayment}"/>`,e+=`<input type="hidden" name="CheckMacValue" value="${t.checkMacValue}"/>`,e+=`<input type="hidden" name="EncryptType" value="${t.encryptType}"/>`,t.storeID&&(e+=`<input type="hidden" name="StoreID" value="${t.storeID}"/>`),t.clientBackURL&&(e+=`<input type="hidden" name="ClientBackURL" value="${t.clientBackURL}"/>`),t.itemURL&&(e+=`<input type="hidden" name="ItemURL" value="${t.itemURL}"/>`),t.remark&&(e+=`<input type="hidden" name="Remark" value="${t.remark}"/>`),t.chooseSubPayment&&(e+=`<input type="hidden" name="ChooseSubPayment" value="${t.chooseSubPayment}"/>`),t.orderResultURL&&(e+=`<input type="hidden" name="OrderResultURL" value="${t.orderResultURL}"/>`),t.needExtraPaidInfo&&(e+=`<input type="hidden" name="NeedExtraPaidInfo" value="${t.needExtraPaidInfo}"/>`),t.ignorePayment&&(e+=`<input type="hidden" name="IgnorePayment" value="${t.ignorePayment}"/>`),t.platformID&&(e+=`<input type="hidden" name="PlatformID" value="${t.platformID}"/>`),t.invoiceMark&&(e+=`<input type="hidden" name="InvoiceMark" value="${t.invoiceMark}"/>`),t.customField1&&(e+=`<input type="hidden" name="CustomField1" value="${t.customField1}"/>`),t.customField2&&(e+=`<input type="hidden" name="CustomField2" value="${t.customField2}"/>`),t.customField3&&(e+=`<input type="hidden" name="CustomField3" value="${t.customField3}"/>`),t.customField4&&(e+=`<input type="hidden" name="CustomField4" value="${t.customField4}"/>`),t.language&&(e+=`<input type="hidden" name="Language" value="${t.language}"/>`),t.unionPay&&(e+=`<input type="hidden" name="UnionPay" value="${t.unionPay}"/>`),e+="</form>",e}},components:{}};const Ie=(0,c.Z)(Te,[["render",ke],["__scopeId","data-v-2af56bc6"]]);var Fe=Ie,Pe=n(2401);Wt.vI.add(Ht.BC0,Ht.wp6,Ht.r8p,Ht.Kl4,Ht.$aW);const De={confirmButtonColor:"#41b882",cancelButtonColor:"#ff7674"},Be=(0,a.ri)(d);Be.component("font-awesome-icon",zt.GN).component("Loading",Jt()).component("Layout01",ae).component("ShoppingCart",Fe).component("CashView",Mt).use(Et(),De).use(Pe.Z).use(Vt).mount("#app"),p.Z.defaults.baseURL="/",Be.config.globalProperties.$axios=p.Z}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var s=e[a]={exports:{}};return t[a].call(s.exports,s,s.exports,n),s.exports}n.m=t,function(){var t=[];n.O=function(e,a,o,s){if(!a){var l=1/0;for(d=0;d<t.length;d++){a=t[d][0],o=t[d][1],s=t[d][2];for(var i=!0,c=0;c<a.length;c++)(!1&s||l>=s)&&Object.keys(n.O).every((function(t){return n.O[t](a[c])}))?a.splice(c--,1):(i=!1,s<l&&(l=s));if(i){t.splice(d--,1);var r=o();void 0!==r&&(e=r)}}return e}s=s||0;for(var d=t.length;d>0&&t[d-1][2]>s;d--)t[d]=t[d-1];t[d]=[a,o,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var o,s,l=a[0],i=a[1],c=a[2],r=0;if(l.some((function(e){return 0!==t[e]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(c)var d=c(n)}for(e&&e(a);r<l.length;r++)s=l[r],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(d)},a=self["webpackChunkvuetest"]=self["webpackChunkvuetest"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(4733)}));a=n.O(a)})();