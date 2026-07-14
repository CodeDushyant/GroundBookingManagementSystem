#pragma once

#include <drogon/HttpController.h>


using namespace drogon;


class CustomerController : public HttpController<CustomerController>
{

public:


METHOD_LIST_BEGIN

ADD_METHOD_TO(
    CustomerController::createCustomer,
    "/customers",
    Post
);


METHOD_LIST_END



void createCustomer(
    const HttpRequestPtr &req,
    std::function<void (const HttpResponsePtr &)> &&callback
);

};