describe("disabled", function(){
  it("should be disabled",function(){
    var actual = $("blue-btn").attr("disabled");
    expect(actual).to.equal("true");
  });

  it("should be enabled", function(){
    enableAll();
    var actual = $("red-btn").attr("disabled");
    expect(actual).to.equal("false");
  });
});
