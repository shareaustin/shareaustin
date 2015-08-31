var User = require("../../../server/model/user")

describe("User relations", function(){
  var relations;

  beforeEach(function(done){
    new User({id: 1}).fetch({
      withRelated: [
        'items',
        'soldTransactions',
        'boughtTransactions',
        'buyerChats',
        'sellerChats',
      ]
    }).then(function(model){
      relations = model.relations;
      done();
    });
  });

  it("items in relations object", function(done){
    expect(relations.hasOwnProperty('items')).toBe(true);
    expect(relations.items.length).toEqual(2);
    done();
  });

  it("soldTransactions in relations object", function(done){
    expect(relations.hasOwnProperty('soldTransactions')).toBe(true);
    expect(relations.soldTransactions.length).toEqual(7);
    done();
  });

  it("boughtTransactions in relations object", function(done){
    expect(relations.hasOwnProperty('boughtTransactions')).toBe(true);
    expect(relations.boughtTransactions.length).toEqual(3);
    done();
  });

  it("buyerChats in relations object", function(done){
    expect(relations.hasOwnProperty('buyerChats')).toBe(true);
    expect(relations.buyerChats.length).toEqual(1);
    done();
  });

  it("sellerChats in relations object", function(done){
    expect(relations.hasOwnProperty('sellerChats')).toBe(true);
    expect(relations.sellerChats.length).toEqual(1);
    done();
  });
});
