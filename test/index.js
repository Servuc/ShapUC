import { should } from 'chai';
import shapUc from '../lib';


should();
var myDatas;
beforeEach(function() {
  myDatas =
  {
    "roadAttr": {
      "building": false,
      "highway": "Residential",
      "_id": "-629863",
      "nodes": [{
        "y": 369.0,
        "x": 708.0
      },
        {
          "y": 396.0,
          "x": 743.0
        }],
      "name": "Rue de Colmar"
    },

    "amenityAttr": {
      "_id": "-629724",
      "nodes": [{
        "y": 32.0,
        "x": 629.0
      },
        {
          "y": 42.0,
          "x": 597.0
        },
        {
          "y": 43.0,
          "x": 595.0
        },
        {
          "y": 32.0,
          "x": 629.0
        }],
      "amenity": "parking"
    },

    "buildingAttr": {
      "building": true,
      "_id": "-629719",
      "nodes": [{
        "y": 0.0,
        "x": 0.0
      },
        {
          "y": 0.0,
          "x": 100.0
        },
        {
          "y": 100.0,
          "x": 100.0
        },
        {
          "y": 100.0,
          "x": 0.0
        },
        {
          "y": 0.0,
          "x": 0.0
        }]
    },

    "naturalAttr": {
      "building": false,
      "_id": "-630043",
      "nodes": [{
        "y": 309.0,
        "x": 222.0
      },
        {
          "y": 324.0,
          "x": 262.0
        },
        {
          "y": 335.0,
          "x": 231.0
        },
        {
          "y": 309.0,
          "x": 222.0
        }],
      "name": "Bassin Paul Vatine",
      "natural": "water"
    }
  };
});

describe('shap-uc', function () {
  it('Version exists', function () {
    shapUc.should.have.property('VERSION');
  });

  it('Test Creation of a Default Object', function() {
    shapUc.createShape.should.to.be.a("function", 'The Shapes module sould expose a "createShape" function');
    var shape0 = shapUc.createShape(myDatas.roadAttr);
    shape0.should.to.be.an('object', 'The "createShape" function sould return objects.');
  });

  it('Test proper hidding of properties', function()
  {
    var shape0 = shapUc.createShape(myDatas.roadAttr);
    shape0.should.have.property("id", "-629863", "Property 'id' find")
    shape0.should.have.property("toString", shape0.toString, "Property 'toString' find")
    shape0.should.have.property("toSvgPath", shape0.toSvgPath, "Property 'toSvgPath' find")
    shape0.should.have.property("getName", shape0.getName, "Property 'getName' find")
  });

  it('Test the toSVGString method', function() {
    var shape0 = shapUc.createShape(myDatas.roadAttr);
    shape0.toSvgPath().should.equal('M 708 369 L 743 396', 'Should create a valid SVG PATH (google SVG PATH for details)');
  });

  it('Test the name accessor', function() {
    var shape0 = shapUc.createShape(myDatas.roadAttr);
    shape0.getName().should.equal('Rue de Colmar', 'Should return the value corresponding to the "name" property in the attributes');
  });

  it('Test objects created with the createRoad function', function() {
    shapUc.createRoad.should.to.be.a("function",'Object Created with "createRoad"');
    var road = shapUc.createRoad(myDatas.roadAttr);
    road.getCategory.should.to.be.a("function", 'Object Created with "createRoad" Should have a getCategory function');
    road.getCategory().should.equal('Residential', 'Should return the value corresponding to the "highway" property in the attributes');
    road.toString.should.to.be.a("function", 'Object Created with "createRoad" Should have a toString function');
    road.toString().should.equal("{(id : -629863 | name : Rue de Colmar) | category : Residential}", 'Should return the value corresponding to the toString');
  });

  it('Test objects created with the  createAmenity function', function() {
    shapUc.createAmenity.should.to.be.a("function",'Object Created with "createAmenity"');
    var amenity = shapUc.createAmenity(myDatas.amenityAttr);
    amenity.getType.should.to.be.a("function", 'Object Created with "createAmenity" Should have a getType function');
    amenity.getType().should.equal('parking', 'Should return the value corresponding to the "amenity" property in the attributes');
    amenity.toString.should.to.be.a("function", 'Object Created with "createAmenity" Should have a toString function');
    amenity.toString().should.equal("{(id : -629724 | name : 0) | type : parking}", 'Should return the value corresponding to the toString');
  });

  it('Test objects created with the  createBuilding function', function() {
    shapUc.createBuilding.should.to.be.a('function', 'The Shapes module sould expose a "createBuilding" function');
    var building = shapUc.createBuilding(myDatas.buildingAttr);
    building.getArea.should.to.be.a("function", 'Object Created with "createBuilding" Should have a getArea function');
    building.getArea().should.equal(10000, 'Should return the area of the building computed from the set of points in the nodes attributes');
    building.toString.should.to.be.a("function", 'Object Created with "createBuilding" Should have a toString function');
    building.toString().should.equal("{(id : -629719 | name : 0) | area : 10000m²}", 'Should return the value corresponding to the toString');
  });

  it('Test objects created with the  createNatural function', function() {
    shapUc.createNatural.should.to.be.a('function', 'The Shapes module sould expose a "createNatural" function');
    var natural = shapUc.createNatural(myDatas.naturalAttr);
    natural.getType.should.to.be.a("function", 'Object Created with "createNatural" Should have a getType function');
    natural.getType().should.equal('water', 'Should return the value corresponding to the "natural" property in the attributes');
    natural.toString.should.to.be.a("function", 'Object Created with "createNatural" Should have a toString function');
    natural.toString().should.equal("{(id : -630043 | name : Bassin Paul Vatine) | type : water}", 'Should return the value corresponding to the toString');
  });
});
