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
        search.query_url = 'http://localhost:8983/solr/EducaSA/select?q=text:';
        // $scope.query_url += $scope.searchString+"&wt=json&json.wrf=callback";
        var strlist = search.searchString.split(' ');
        for(var k = 0;k < strlist.length; k++)
        {
            search.query_url += "\""+strlist[k]+"\"%20"
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

            var resultsTitle = Handlebars.compile($("#results-title").html());
            $("#new").append(resultsTitle({text: search.searchString, count: $scope.count}));
        });

        console.log(search.results.length);

    };

}

// Create the instant search filter

// app.filter('searchFor', function(){
//
//     // All filters must return a function. The first parameter
//     // is the data that is to be filtered, and the second is an
//     // argument that may be passed with a colon (searchFor:searchString)
//
//     return function(arr, searchString){
//
//         if(!searchString)
//         {
//             return arr;
//         }
//
//         var result = [];
//
//         searchString = searchString.toLowerCase();
//
//         // Using the forEach helper method to loop through the array
//         angular.forEach(arr, function(item){
//
//             if(item.title.toLowerCase().indexOf(searchString) !== -1){
//                 result.push(item);
//             }
//
//         });
//
//         return result;
//     };
//
// });


// The controller
//
// function searchController($scope){
//
//     // The data model. These items would normally be requested via AJAX,
//     // but are hardcoded here for simplicity. See the next example for
//     // tips on using AJAX.
//
//     $scope.results = [];
//
//     $scope.items = [
//         {
//             url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
//             title: '50 Must-have plugins for extending Twitter Bootstrap'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
//             title: 'Making a Super Simple Registration System With PHP and MySQL'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
//             title: 'Create a slide-out footer with this neat z-index trick'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/06/digital-clock/',
//             title: 'How to Make a Digital Clock with jQuery and CSS3'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
//             title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
//             title: 'Mini AJAX File Upload Form'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
//             title: 'Your First Backbone.js App – Service Chooser'
//         }
//     ];
//
//     // $scope.submitQuery = function()
//     // {
//     //     // var text = $scope.searchString;
//     //     // alert(text);
//     //     $scope.query_url = 'http://localhost:8983/solr/techproducts/select?q=';
//     //     // $scope.query_url += $scope.searchString+"&wt=json&json.wrf=callback";
//     //     $scope.query_url += $scope.searchString;
//     //
//     //
//     //     var hitTemplate = Handlebars.compile($("#hit-template").html());
//     //
//     //     var resultsTitle = Handlebars.compile($("#results-title").html());
//     //
//     //     $("#new").append(resultsTitle({text: $scope.searchString}));
//     //
//     //     $scope.results = [];
//     //
//     //     $.getJSON($scope.query_url, function(result)
//     //     {
//     //         // alert(result.response.docs.length);
//     //         // $scope.results = result.response.docs;
//     //         for (var i = 0; i < result.response.docs.length; i++)
//     //         {
//     //             $scope.results.push(result.response.docs[i])
//     //             // console.log(result.response.docs.length);
//     //             // $("#new").append(hitTemplate({title: result.response.docs[i].name, text: result.response.docs[i].manu}));
//     //         }
//     //     });
//     //
//     // }
//
//
// }
