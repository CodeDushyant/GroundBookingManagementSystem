#include "CustomerController.h"
#include <iostream>


void CustomerController::createCustomer(
    const HttpRequestPtr &req,
    std::function<void (const HttpResponsePtr &)> &&callback
)
{

    auto json = req->getJsonObject();


    if(!json)
    {
        auto resp = HttpResponse::newHttpJsonResponse(
            {
                {"error","Invalid JSON"}
            }
        );

        callback(resp);
        return;
    }



    std::string name =
        (*json)["name"].asString();


    std::string email =
        (*json)["email"].asString();


    std::string phone =
        (*json)["phone"].asString();



    std::cout<<"Customer Created\n";

    std::cout<<"Name : "
             <<name<<std::endl;


    Json::Value response;

    response["message"] =
        "Customer created successfully";


    response["name"] = name;
    response["email"] = email;
    response["phone"] = phone;



    auto resp =
        HttpResponse::newHttpJsonResponse(response);


    callback(resp);

}