var Message = require("../../../server/model/message")

describe("Message relations", function(){
  var relations;

  beforeEach(function(done){
    new Message({id: 1}).fetch({
      withRelated: [
        'sender',
      ]
    }).then(function(model){
      relations = model.relations;
      done();
    });
  });

  it("sender in relations object", function(done){
    expect(relations.hasOwnProperty('sender')).toBe(true);
    expect(relations.sender.attributes.first_name).toEqual("Duevyn");
    done();
  });
});
