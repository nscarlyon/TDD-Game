function drawObject(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    context.fillRect(-obj.size.width / 2, -obj.size.height / 2,
        obj.size.width, obj.size.height);
    context.restore();
}

function getDistance(object1, object2) {
    var dx = object1.position.x - object2.position.x;
    var dy = object1.position.y - object2.position.y;
    return Math.sqrt(dx * dx + dy * dy);
}
