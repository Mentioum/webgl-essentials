function WbGl(CID, FSID, VSID){
    var canvas = document.getElementById(CID);
    if(!canvas.getContext("webgl") && !canvas.getContext("experimental-webgl"))
        alert("Your Browser Doesn't Support WebGL - Get a decent Browser Damn It!");
    else
    {
        this.GL = (canvas.getContext("webgl")) ? canvas.getContext("webgl") : canvas.getContext("experimental-webgl");

        this.GL.clearColor(1.0,1.0,1.0,1.0); //This is color.
        this.GL.enable(this.GL.DEPTH_TEST);
        this.GL.depthFunc(this.GL.LEQUAL);
        this.AspectRatio = canvas.width / canvas.height;

        //Load Shaders Here
    }

}
