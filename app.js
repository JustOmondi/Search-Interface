// Define a new module for our app
var app = angular.module("searchApp", []);

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

function mainController($scope)
{
    var search = $scope;

    var snippetMaxCharLength = 800;

    var maxWords = 70;

    var docsToReturn = 30;

    search.results = [];
    $scope.count = 0;

    search.items = [];

    search.submitQuery = function()
    {
        $scope.count = 0;
        console.log("Submit query called");

        // search.query_url = 'http://localhost:8983/solr/techproducts/select?q=';
        // search.query_url = 'http://localhost:8983/solr/EducaSA/select?q=text:';
        search.query_url = 'http://localhost:8983/solr/educasa_stemming/select?q=text:';
        // $scope.query_url += $scope.searchString+"&wt=json&json.wrf=callback";
        var strlist = search.searchString.split(' ');
        for(var k = 0;k < strlist.length; k++)
        {
            search.query_url += "\""+strlist[k]+"\"%20";
        }
        search.query_url = search.query_url.substr(0, search.query_url.length-3);
        // search.query_url += "\"";
        // search.query_url += search.searchString+"\"";

        $("#new").empty();

        search.results = [];

        search.items = [];

        $.getJSON(search.query_url, function(result)
        {
            // alert(result.response.docs.length);
            // $scope.results = result.response.docs;

            console.log(result.response.docs.length+" documents returned");

            for (var i = 0; i < docsToReturn; i++)
            {
                $scope.$apply(function ()
                {
                    search.results.push(result.response.docs[i]);

                    if(result.response.docs[i].text)
                    {
                        var longtext = result.response.docs[i].text[0];
                        var words = longtext.substr(0, snippetMaxCharLength).split(" ");

                        console.log("Long text size = "+result.response.docs[i].text[0].length);

                        var shortText = '';

                        // if(search.snippetMaxCharLength > longtext.length)
                        // {
                        //     search.snippetMaxCharLength = longtext.length;
                        // }

                        for (var j = 0; j < maxWords; j++)
                        {
                            shortText += words[j]+" ";
                        }
                        shortText += " . . . ";

                        search.items.push({title: result.response.docs[i].Title, text: shortText, url: result.response.docs[i].url});
                        // search.items.push({title: result.response.docs[i].title, text: shortText});
                        $scope.count++;
                    }
                    else
                    {
                        console.log("Invalid doc: "+result.response.docs[i].Title);
                        docsToReturn++;
                    }

                });



                // $scope.results.push(result.response.docs[i])
            }

            if(search.searchString == '')
            {
                $("#new").append("<h4>No query entered</h4>")
            }
            else
            {
                var resultsTitle = Handlebars.compile($("#results-title").html());
                $("#new").append(resultsTitle({text: search.searchString, count: $scope.count}));
            }

        });

        console.log(search.results.length);

    };

}