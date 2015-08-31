var Favorite = require("../../../server/model/favorite")

describe("Favorite relations", function(){
  var relations;

  beforeEach(function(done){
    new Favorite({user_id: 1, item_id: 1}).fetch({
      withRelated: [
        'item',
      ]
    }).then(function(model){
      relations = model.relations;
      done();
    });
  });

  it("item in relations object", function(done){
    expect(relations.hasOwnProperty('item')).toBe(true);
    expect(relations.item.attributes.name).toEqual("Intex Challenger Kayak");
    done();
  });
});
