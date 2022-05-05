(self.webpackChunkmp_webgl=self.webpackChunkmp_webgl||[]).push([[431],{17431:(e,t,r)=>{"use strict";var n,o,i,a,s,c,u;r.d(t,{w:()=>a}),function(e){e.FORWARD="FORWARD",e.LEFT="LEFT",e.RIGHT="RIGHT",e.BACK="BACK",e.UP="UP",e.DOWN="DOWN"}(n||(n={}));!function(e){e.INSIDE="mode.inside",e.OUTSIDE="mode.outside",e.DOLLHOUSE="mode.dollhouse",e.FLOORPLAN="mode.floorplan",e.TRANSITIONING="mode.transitioning"}(o||(o={}));!function(e){e.INSTANT="transition.instant",e.FLY="transition.fly",e.FADEOUT="transition.fade"}(i||(i={}));class convertRotation_Conversion{constructor(e){this.THREE=e,this.tempEuler=new e.Euler}quaternionToRotation(e,t){const r=this.tempEuler.setFromQuaternion(e,convertRotation_Conversion.eulerOrder),n=t||{};return n.x=this.THREE.MathUtils.radToDeg(r.x),n.y=this.THREE.MathUtils.radToDeg(r.y),n.z=this.THREE.MathUtils.radToDeg(r.z),n}rotationToQuaternion(e,t){const r=t||new this.THREE.Quaternion;return this.tempEuler.x=this.THREE.MathUtils.degToRad(e.x),this.tempEuler.y=this.THREE.MathUtils.degToRad(e.y),this.tempEuler.z=this.THREE.MathUtils.degToRad(e.z||0),this.tempEuler.order=convertRotation_Conversion.eulerOrder,r.setFromEuler(this.tempEuler)}}convertRotation_Conversion.eulerOrder="YXZ",function(e){e.LEGACY="legacy",e.API="api"}(a||(a={})),function(e){e.PHASE_CHANGE="application.phasechange",e.APP_CHANGE="application.appchange"}(s||(s={})),function(e){e.UNKNOWN="application.unknown",e.WEBVR="application.webvr",e.SHOWCASE="application.showcase",e.WORKSHOP="application.workshop"}(c||(c={})),function(e){e.UNINITIALIZED="appphase.uninitialized",e.WAITING="appphase.waiting",e.LOADING="appphase.loading",e.STARTING="appphase.starting",e.PLAYING="appphase.playing",e.ERROR="appphase.error"}(u||(u={}));Math.PI;var d;!function(e){e.MOVE="camera.move"}(d||(d={}));var p=r(88512);new p.Z("broadcast.move");new p.Z("command.zoom");var h,l,E,w,g,T;!function(e){e.CHANGE_START="floors.changestart",e.CHANGE_END="floors.changeend"}(h||(h={})),function(e){e.POSITION_UPDATED="label.positionupdated"}(l||(l={})),function(e){e.HOVER="tag.hover",e.CLICK="tag.click",e.LINK_OPEN="tag.linkopen"}(E||(E={})),function(e){e.NONE="mattertag.media.none",e.PHOTO="mattertag.media.photo",e.VIDEO="mattertag.media.video",e.RICH="mattertag.media.rich"}(w||(w={})),function(e){e.NONE="tag.chunk.none",e.TEXT="tag.chunk.text",e.LINK="tag.chunk.link"}(g||(g={})),function(e){e.NAVIGATION="tag.link.nav",e.MODEL="tag.link.model",e.EXT_LINK="tag.link.ext"}(T||(T={}));r(28883);const S=new p.Z("sdk.editIcon");class SvgLoader{constructor(e){this.queue=e}async load(e){const t=await this.queue.get(e,{responseType:"text"}),r=document.createElement("div");r.innerHTML=t;const n=r.querySelector("svg");if(!n)throw Error("Failed trying to load "+e+"as an svg.");const o=n.getAttribute("width"),i=n.getAttribute("height");return o||i?(i&&!o&&(S.warn(e,"does not have a defined width. Defaulting width equal to height"),n.setAttribute("width",i)),o&&!i&&(S.warn(e,"does not have a defined height. Defaulting height equal to width"),n.setAttribute("height",o))):(S.warn(e,"does not have a defined size. Defaulting to a 128x128 resolution"),n.setAttribute("width",SvgLoader.defaultResolution),n.setAttribute("height",SvgLoader.defaultResolution)),new Promise((e=>{const t=new Image;t.onload=()=>e(t),t.src=URL.createObjectURL(new Blob([n.outerHTML],{type:"image/svg+xml"}))}))}}SvgLoader.defaultResolution="128";new p.Z("util");new p.Z("mattertag-util");var I;!function(e){e.LABEL="label",e.DESCRIPTION="description",e.MEDIA="media"}(I||(I={}));new p.Z("command.editOpacity");var O;r(84751),r(24467);!function(e){e.CHANGE_START="viewmode.changestart",e.CHANGE_END="viewmode.changeend"}(O||(O={}));new p.Z("move-to-mode-command");var N,m,R,f,A;!function(e){e.MODEL_LOADED="model.loaded"}(N||(N={})),function(e){e.NONE="intersectedobject.none",e.MODEL="intersectedobject.model",e.TAG="intersectedobject.tag",e.SWEEP="intersectedobject.sweep",e.UNKNOWN="intersectedobject.unknown"}(m||(m={}));!function(e){e.Base64JPG="screenshot.base64.jpg",e.ArrayBufferJPG="screenshot.arraybuffer.jpg"}(R||(R={}));class EquirectangularExecutor{constructor(e,t,r){this.Viewmode=t.Viewmode,this.requestTarget=r.requestTarget,this.encodeRenderTarget=r.encodeRenderTarget,this.jpegAsBase64=r.jpegAsBase64,this.getXmp=r.getXmp,this.getOrientedAngleTo=r.getOrientedAngleTo,this.forward=new e.Vector3(0,0,-1),this.sweepForward=new e.Vector3,this.viewForward=new e.Vector3}validateInput(e){return e}async exec(e,t,r,n,o,i,a){if(!i.currentSweep||o.currentMode!==this.Viewmode.Panorama)throw new Error("Can only capture equirectangular projections while stationary in a sweep");const s=r.getScene().camera,c=i.getSweep(i.currentSweep),u=await a.load(c);this.sweepForward.copy(this.forward),this.sweepForward.copy(this.forward).applyQuaternion(c.rotation).setY(0);const d=this.getOrientedAngleTo(this.sweepForward,s.getWorldDirection(this.viewForward).setY(0))+Math.PI,p=await this.requestTarget();p.setSize(EquirectangularExecutor.equirectangularRes.width,EquirectangularExecutor.equirectangularRes.height),n.renderEquirectangular(u,p.target,d);const h=await this.encodeRenderTarget(p,this.getXmp(p.width,p.height,0,0));t.return(this.jpegAsBase64(h))}}EquirectangularExecutor.equirectangularRes={width:4096,height:2048},function(e){e.CLICK="INTERACTION.CLICK",e.HOVER="INTERACTION.HOVER",e.DRAG="INTERACTION.DRAG",e.DRAG_BEGIN="INTERACTION.DRAG_BEGIN",e.DRAG_END="INTERACTION.DRAG_END",e.POINTER_MOVE="INTERACTION.POINTER_MOVE",e.POINTER_BUTTON="INTERACTION.POINTER_BUTTON",e.SCROLL="INTERACTION.SCROLL",e.KEY="INTERACTION.KEY",e.LONG_PRESS_START="INTERACTION.LONG_PRESS_START",e.LONG_PRESS_END="INTERACTION.LONG_PRESS_END",e.MULTI_SWIPE="INTERACTION.MULTI_SWIPE",e.MULTI_SWIPE_END="INTERACTION.MULTI_SWIPE_END",e.PINCH="INTERACTION.PINCH",e.PINCH_END="INTERACTION.PINCH_END",e.ROTATE="INTERACTION.ROTATE",e.ROTATE_END="INTERACTION.ROTATE_END"}(f||(f={})),function(e){e.OBJ_LOADER="mp.objLoader",e.FBX_LOADER="mp.fbxLoader",e.DAE_LOADER="mp.daeLoader",e.GLTF_LOADER="mp.gltfLoader",e.SCROLLING_TUBE="mp.scrollingTube",e.TRANSFORM_CONTROLS="mp.transformControls",e.LIGHTS_COMPONENT="mp.lights",e.POINT_LIGHT="mp.pointLight",e.DIRECTIONAL_LIGHT="mp.directionalLight",e.AMBIENT_LIGHT="mp.ambientLight",e.CAMERA="mp.camera",e.INPUT="mp.input",e.XR="mp.xr"}(A||(A={}));class SensorReadingCollection{constructor(){this.sourceMap=new Map,this.reverseSourceLookup=new Map,this.sourceId=0,this._data={}}get data(){return this._data}isItemEqual(e,t){return e.data[t].inRange===this.data[t].inRange&&e.data[t].inView===this.data[t].inView}update(e){for(const[o,i]of e.readings){const e=this.addOrGetSourceId(o),a=this._data[e]||{};a.inRange=i.inRange,a.inView=i.inView,a.distanceSquared=i.distanceSq,a.direction=(t=i,r="direction",(n=(n=a.direction)||{}).x=t[r].x,n.y=t[r].y,n.z=t[r].z,n),this._data[e]=a}var t,r,n;for(const t in this.data){const r=this.reverseSourceLookup.get(t);r&&!e.readings.get(r)&&(this.sourceMap.delete(r),this.reverseSourceLookup.delete(t),delete this._data[t])}}clear(){this._data={}}addOrGetSourceId(e){const t=this.sourceMap.get(e);if(t)return t;const r="source-"+ ++this.sourceId;return this.sourceMap.set(e,r),this.reverseSourceLookup.set(r,e),r}}var b=r(90121),v=r(54430),L=r(79741),C=r(23549),y=r(40918),_=r(79985),D=r(66363);class SensorStateObservable{constructor(){this._data={origin:{x:0,y:0,z:0},forward:{x:0,y:0,z:-1}}}get data(){return this._data}equals(e){const t=1e-5;return(0,D.wo)(this.data.origin,e.data.origin,t)&&(0,D.wo)(this.data.forward,e.data.forward,t)}copy(e){(0,_.OL)(this._data.origin,e.data.origin),(0,_.OL)(this._data.forward,e.data.forward)}update(e){(0,_.OL)(this._data.origin,e.frustum.origin),(0,_.OL)(this._data.forward,e.frustum.forward)}}function P(e,t){return Object.values(e).includes(t)}class executor_createSensor_CreateSensorExecutor{constructor(e,t){this.sdkModule=e,this.sensorFactories=t}validateInput(e){if(!P(C.dE,e.type))throw Error(e.type+" is not a valid sensor type");return this.sensorFactories[e.type].validateInput(e)}async exec(e,t,r,n,o){const i=this.sensorFactories[e.type].create(e,r),a="sensor-"+ ++executor_createSensor_CreateSensorExecutor.nextSensorId;n.set(a,i);const s=y.l.create(new b.F(i),new SensorStateSubscriptionFactory,new v.h(SensorStateObservable)),c=this.sdkModule.addObservable(a,s),u=L.o.create(new b.F(i),new SensorReadingSubscriptionFactory,new v.h(SensorReadingCollection)),d=this.sdkModule.addCollection(a,u);o.set(a,{dispose(){c.dispose(),d.dispose()}}),t.return({sensorId:a})}}executor_createSensor_CreateSensorExecutor.nextSensorId=0;class SensorStateSubscriptionFactory{create(e,t){return t.frustum.observe(new DependencyObserverAdaptor(e))}}class SensorReadingSubscriptionFactory{create(e,t){return t.onReadingsUpdated(new DependencyObserverAdaptor(e))}}class DependencyObserverAdaptor{constructor(e){this.dependencyObserver=e}notify(){this.dependencyObserver.onChanged()}}var x=r(40388);Math.PI;class executor_createSource_CreateSourceExecutor{constructor(e){this.sourceFactories=e}validateInput(e,t){if(!P(x.PO,e.type))throw Error(e.type+" is not a valid source type");return this.sourceFactories[e.type].validateInput(e)}exec(e,t,r){const n=this.sourceFactories[e.type].create(e),o="source-"+ ++executor_createSource_CreateSourceExecutor.nextSourceId;r.set(o,n),t.return({sourceId:o,type:e.type,volume:n.describeVolume()})}}executor_createSource_CreateSourceExecutor.nextSourceId=0;var G,M,F;!function(e){e.FPS="stat.fps"}(G||(G={}));!function(e){e.ALIGNED="aligned",e.UNALIGNED="unaligned"}(M||(M={})),function(e){e.UNPLACED="unplaced",e.AUTO="auto",e.MANUAL="manual"}(F||(F={}));var H,U,q=r(68524);class CurrentSweepObservable{constructor(e,t){this.currentSweep=Object.assign(Object.assign({},CurrentSweepObservable.empty),{floorInfo:Object.assign({},CurrentSweepObservable.empty.floorInfo),neighbors:[],position:Object.assign({},CurrentSweepObservable.empty.position),rotation:Object.assign({},CurrentSweepObservable.empty.rotation)}),this.Viewmode=e.Viewmode,this.sweepPlacementConverter=t.sweepPlacementConverter}get data(){return this.currentSweep}equals(e){const t=q.Z.epsilon;return this.currentSweep.id===e.data.id&&this.currentSweep.enabled===e.data.enabled&&this.currentSweep.alignmentType===e.data.alignmentType&&this.currentSweep.placementType===e.data.placementType&&this.currentSweep.floorInfo.id===e.data.floorInfo.id&&this.currentSweep.floorInfo.sequence===e.data.floorInfo.sequence&&this.compareNeighbors(e.currentSweep)&&(0,D.wo)(this.currentSweep.position,e.data.position,t)&&(0,D.wo)(this.currentSweep.rotation,e.data.rotation,t)}copy(e){this.copySweep(e.data)}update(e,t,r,n,o){const i=e.currentSweepObject;if(!i||e.transition.active||t.transition.active||t.currentMode!==this.Viewmode.Panorama&&t.currentMode!==this.Viewmode.Outdoor)return void this.copySweep(CurrentSweepObservable.empty);let a;try{a=r.getFloor(i.floorId||"")}catch(e){a={id:void 0,index:void 0}}const s=n.getIdForSweep(i);this.currentSweep.uuid=i.uuid,this.currentSweep.sid=s,this.currentSweep.id=s,this.currentSweep.enabled=i.enabled,this.currentSweep.alignmentType=this.sweepPlacementConverter.toSdkAlignment(i.alignmentType),this.currentSweep.placementType=this.sweepPlacementConverter.toSdkPlacement(i.placementType),this.currentSweep.neighbors=[...i.neighbours],(0,_.OL)(this.currentSweep.position,i.position),(0,_.OL)(this.currentSweep.rotation,i.rotation),this.currentSweep.alignmentType===M.UNALIGNED&&this.currentSweep.placementType===F.UNPLACED?(this.currentSweep.floorInfo.id=void 0,this.currentSweep.floorInfo.sequence=void 0):(this.currentSweep.floorInfo.id=a.id?o.getIdFromCwfId(a.id):a.id,this.currentSweep.floorInfo.sequence=a.index)}copySweep(e){this.currentSweep.uuid=e.uuid,this.currentSweep.sid=e.sid,this.currentSweep.id=e.id,this.currentSweep.enabled=e.enabled,this.currentSweep.alignmentType=e.alignmentType,this.currentSweep.placementType=e.placementType,this.currentSweep.floorInfo.id=e.floorInfo.id,this.currentSweep.floorInfo.sequence=e.floorInfo.sequence,this.currentSweep.neighbors=[...e.neighbors],(0,_.OL)(this.currentSweep.position,e.position),(0,_.OL)(this.currentSweep.rotation,e.rotation)}compareNeighbors(e){const t=this.currentSweep.neighbors.length;for(let r=0;r<t;++r)if(this.currentSweep.neighbors[r]!==e.neighbors[r])return!1;return t===e.neighbors.length}}CurrentSweepObservable.empty={uuid:"",sid:"",id:"",enabled:!1,alignmentType:M.ALIGNED,placementType:F.UNPLACED,floorInfo:{id:void 0,sequence:void 0},neighbors:[],position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0}},function(e){e.ENTER="sweep.enter",e.EXIT="sweep.exit"}(H||(H={}));!function(e){e.STARTED="tour.started",e.STOPPED="tour.stopped",e.ENDED="tour.ended",e.STEPPED="tour.stepped"}(U||(U={}));new p.Z("sdk: tours")}}]);