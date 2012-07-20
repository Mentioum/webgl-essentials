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
        //
        var FShader = document.getElementById(FSID); //vertex shader
        var VShader = document.getElementById(VSID); //fragment shader

        if(!FShader || !VShader)
            alert("Error, Could Not Find Shaders");
        else{
            //Load and compule fragment shader
            var Code = LoadShader(FShader);
            FShader = this.GL.createShader(this.GL.FRAGMENT_SHADER);
            this.GL.shaderSource(FShader, Code);
            this.GL.compileShader(FShader);

            //Load and compule vertex shader
            Code = LoadShader(VShader);
            VShader = this.GL.createShader(this.GL.FRAGMENT_SHADER);
            this.GL.shaderSource(VShader, Code);
            this.GL.compileShader(VShader);

            //Create the shader program
            this.ShaderProgram = this.GL.createProgram();
            this.GL.attachShader(this.ShaderProgram, FShader);
            this.GL.attachShader(this.ShaderProgram, VShader);
            this.GL.linkProgram(this.ShaderProgram);
            this.GL.useProgram(this.ShaderProgram);

            //Link vertex position attribute from shader
            this.VertexPosition = this.getAttribLocation(this.ShaderProgram, "VertexPosition");
            this.VertexPosition = this.GL.getAttribLocation(this.VertexPosition);

            //Link texture coordinate attribute from shader
            this.VertexTexture = this.GL.getAttribLocation(this.ShaderProgram, "TextureCoord");
            this.GL.enableVertexAttribArray(this.VertexTexture);
        }
    }
}

function LoadShader(Script){
    var Code = "";
    var CurrentChild = Script.firstChild;
    while(CurrentChild){
        if (CurrentChild.nodeType == CurrentChild.TEXT_NODE)
            Code += CurrentChild.textContent;
        CurrentChild = CurrentChild.nextSibling;
    }
    return Code;
}
