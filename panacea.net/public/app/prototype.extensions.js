
if(String.prototype.format !== "function"){
    String.prototype.format = String.prototype.f = function() {
        var s = this,
            i = arguments.length;

        while (i--) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
        }
        return s;
    };
}

if(Array.prototype.remove !== "function"){
    Array.prototype.remove = function(item){
        var index = this.indexOf(item);
        if(index > -1){
            this.splice(index, 1);
        }
    };
}

if(Array.prototype.find !== "function"){
    Array.prototype.find = function(callback){
        for (var index = 0; index < this.length; index++){
            if(callback){
                return this[index];
            }
        }
    };
}
