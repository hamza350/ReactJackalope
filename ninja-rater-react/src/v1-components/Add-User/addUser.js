import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Button } from "primereact/components/button/Button";
import $ from "jquery";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import "../../../src/App.css";

class AddUser extends React.Component {
    constructor(props) {
        super(props);   
    }
    
    render() {
        $(function () {
            var actions = $("table td:last-child").html();
            // Append table with add row form on add new button click
            $(document).on("click", ".add-new", function () {
                if($(".add-user tr").length>3){
                    alert("You can add upto 3 users only");
                    return false;
                }
                $(this).attr("disabled", "disabled");
                var index = $("table.add-user tbody tr:last-child").index();
                var row = '<tr>' +
                    '<td><input type="text" class="form-control" name="userName" id="userName"></td>' +
                    '<td><input type="text" class="form-control" name="pswd" id="pswd"></td>' +
                    '<td><input type="text" class="form-control" name="firstName" id="firstName"></td>' +
                    '<td><input type="text" class="form-control" name="lastName" id="lastName"></td>' +
                    '<td><input type="text" class="form-control" name="email" id="email"></td>' +
                    '<td>' + actions + '</td>' +
                    '</tr>';
                $("table.add-user").append(row);
                $("table.add-user tbody tr").eq(index + 1).find(".add, .edit").toggle();
            });
            // Add row on add button click
            $(document).on("click", ".add", function () {
                var empty = false;
                var input = $(this).parents("tr").find('input[type="text"]');
                input.each(function () {
                    if (!$(this).val()) {
                        $(this).addClass("error");
                        empty = true;
                    } else {
                        $(this).removeClass("error");
                    }
                });
                $(this).parents("tr").find(".error").first().focus();
                if (!empty) {
                    input.each(function () {
                        $(this).parent("td").html($(this).val());
                    });
                    $(this).parents("tr").find(".add, .edit").toggle();
                    $(".add-new").removeAttr("disabled");
                }
            });
            // Edit row on edit button click
            $(document).on("click", ".edit", function () {
                $(this).parents("tr").find("td:not(:last-child)").each(function () {
                    $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
                });
                $(this).parents("tr").find(".add, .edit").toggle();
                $(".add-new").attr("disabled", "disabled");
            });
            // Delete row on delete button click
            $(document).on("click", ".delete", function () {
                $(this).parents("tr").remove();
                $(".add-new").removeAttr("disabled");
            });
        });
        return (
            <div className="ui-g-12 no-padding">
                <p className={["previous_head", "commonButtonClass"].join(" ")}>
                            Add User
            </p>
        
            <div id="main" className="container sidebar-none sidebar-divider-vertical">
                <div className="wf-wrap">
                    <div className="wf-container-main">
                        <div id="content" className="content" role="main">
                            <div>
                            <Button
                            className="commonButtonClass add-new"
                                type="button"
                                style={{
                                    float: "right",
                                    marginBottom: "15px"
                                }}
                                label="Add User"></Button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered add-user">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>User Name</th>
                                            <th>Password</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>thiru</td>
                                            <td>olive@123</td>
                                            <td>Thiru</td>
                                            <td>Basani</td>
                                            <td>thirumalesh@olivetech.net</td>
                                            <td>
                                                <a className="add" title="Add" ><i className="material-icons">&#xE03B;</i></a>
                                                <a className="edit" title="Edit" ><i className="material-icons">&#xE254;</i></a>
                                                <a className="delete" title="Delete" ><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>vijaya</td>
                                            <td>vijaya@123</td>
                                            <td>Vijaya</td>
                                            <td>Nemala</td>
                                            <td>vijaya@olivetech.net</td>
                                            <td>
                                                <a className="add" title="Add" ><i className="material-icons">&#xE03B;</i></a>
                                                <a className="edit" title="Edit" ><i className="material-icons">&#xE254;</i></a>
                                                <a className="delete" title="Delete" ><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>vishva</td>
                                            <td>prasad@123</td>
                                            <td>Vishva</td>
                                            <td>Peddi</td>
                                            <td>vishvaprasad@olivetech.net</td>
                                            <td>
                                                <a className="add" title="Add" ><i className="material-icons">&#xE03B;</i></a>
                                                <a className="edit" title="Edit" ><i className="material-icons">&#xE254;</i></a>
                                                <a className="delete" title="Delete" ><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                    
                            </div>
                            <small>Add up to 3 users</small>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default connect(null,null)(withRouter(AddUser));
