var Transaction = require("../../../server/model/transaction")

describe("Transaction relations", function(){
  var relations;

  beforeEach(function(done){
    new Transaction({id: 1}).fetch({
      withRelated: [
        'item',
        'rating'
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

  it("rating in relations object", function(done){
    expect(relations.hasOwnProperty('rating')).toBe(true);
    expect(relations.rating.attributes.transaction_id).toEqual(1);
    done();
  });
});
