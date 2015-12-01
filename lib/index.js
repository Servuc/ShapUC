var Shapes = {
  VERSION: '0.0.1'
};


//Shape
Shapes.createShape = function(attributes)
{
  attributes = attributes || {};
  attributes.name = attributes.name || 0;
  attributes.nodes = attributes.nodes || new Array();

  var shape = {};

  shape.id = attributes._id;

  shape.toString = function()
  {
    return '(id : ' + this.id + " | name : " + attributes.name + ')';
  }

  shape.toSvgPath = function()
  {
    var myReturn = "";
    for(var cpt = 0; cpt < attributes.nodes.length; cpt++)
      myReturn += ((cpt == 0) ? "M " : " L ") + attributes.nodes[cpt].x + " " + attributes.nodes[cpt].y;

    return myReturn;
  }

  shape.getName = function()
  {
    return attributes.name;
  }

  return shape;
}

//Road
Shapes.createRoad = function(attributes)
{
  attributes = attributes || {};
  attributes.category = attributes.category || attributes.highway || "";
  var road = Shapes.createShape(attributes);
  var superToString = road.toString();

  road.toString = function()
  {
    return '{' + superToString + ' | category : ' + attributes.category + '}';
  }

  road.getCategory = function()
  {
    return attributes.category;
  }

  return road;
}


//Building
Shapes.createBuilding = function(attributes)
{
  attributes = attributes || {};
  attributes.area = attributes.area || 0;
  var building = Shapes.createShape(attributes);
  var superToString = building.toString();

  building.toString = function()
  {
    return '{' + superToString + ' | area : ' + this.getArea() + 'm²}';
  }

  building.getArea = function()
  {
    //http://www.mathopenref.com/coordpolygonarea.html
    var myArea = 0;
    for(var cpt = 0; cpt < attributes.nodes.length; cpt++)
    {
      var myNextCpt = (cpt + 1 == attributes.nodes.length) ? 0 : cpt + 1;
      myArea += attributes.nodes[cpt].x * attributes.nodes[myNextCpt].y - attributes.nodes[cpt].y * attributes.nodes[myNextCpt].x;
    }

    return Math.abs(myArea / 2);
  }

  return building;
}

//Amenity
Shapes.createAmenity = function(attributes)
{
  attributes = attributes || {};
  attributes.type = attributes.type || attributes.amenity || "";
  var amenity = Shapes.createShape(attributes);
  var superToString = amenity.toString();

  amenity.toString = function()
  {
    return '{' + superToString + ' | type : ' + attributes.type + '}';
  }

  amenity.getType = function()
  {
    return attributes.type;
  }

  return amenity;
}

//Natural
Shapes.createNatural = function(attributes)
{
  attributes = attributes || {};
  attributes.type = attributes.type || attributes.natural || "";
  var natural = Shapes.createShape(attributes);
  var superToString = natural.toString();

  natural.toString = function()
  {
    return '{' + superToString + ' | type : ' + attributes.type + '}';
  }

  natural.getType = function()
  {
    return attributes.type;
  }

  return natural;
}
export default Shapes;
