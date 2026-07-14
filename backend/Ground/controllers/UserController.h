#pragma once

#include <drogon/HttpSimpleController.h>

using namespace drogon;

class UserController : public HttpSimpleController<UserController>
{
public:
    void asyncHandleHttpRequest(
        const HttpRequestPtr &req,
        std::function<void(const HttpResponsePtr &)> &&callback) override;

    PATH_LIST_BEGIN
    PATH_ADD("/hello", Get);
    PATH_LIST_END
};