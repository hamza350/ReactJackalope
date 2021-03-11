import React, {Component} from 'react';
import {Messages} from 'primereact/components/messages/Messages';
import {Message} from 'primereact/components/message/Message';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';

export class TestMessages extends Component {

    constructor() {
        super();

        this.showSuccess = this.showSuccess.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.showWarn = this.showWarn.bind(this);
        this.showError = this.showError.bind(this);
        this.showMultiple = this.showMultiple.bind(this);
        this.showSticky = this.showSticky.bind(this);
        this.clear = this.clear.bind(this);
    }

    showSuccess() {
        this.messages.show({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
    }

    showInfo() {
        this.messages.show({ severity: 'info', summary: 'Info Message', detail: 'PrimeReact rocks' });
    }

    showWarn() {
        this.messages.show({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showError() {
        this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    showSticky() {
        this.messages.show({ severity: 'info', summary: 'Sticky Message', detail: 'You need to close Me', sticky: true });
    }

    showMultiple() {
        this.messages.show([
            { severity: 'info', summary: 'Message 1', detail: 'PrimeReact rocks' },
            { severity: 'info', summary: 'Message 2', detail: 'PrimeReact rocks' },
            { severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' }
        ]);
    }

    clear() {
        this.messages.clear();
    }

    render() {
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Messages</h1>
                        <p>Messages is used to display inline messages.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Messages ref={(el) => { this.messages = el; }}></Messages>

                    <h3>Severities</h3>
                    <div className="ui-g ui-fluid">
                        <div className="ui-g-12 ui-md-3">
                            <Button onClick={this.showSuccess} label="Success" className="ui-button-success" />
                        </div>
                        <div className="ui-g-12 ui-md-3">
                            <Button onClick={this.showInfo} label="Info" className="ui-button-info" />
                        </div>
                        <div className="ui-g-12 ui-md-3">
                            <Button onClick={this.showWarn} label="Warn" className="ui-button-warning" />
                        </div>
                        <div className="ui-g-12 ui-md-3">
                            <Button onClick={this.showError} label="Error" className="ui-button-danger" />
                        </div>
                    </div>

                    <h3>Options</h3>
                    <div className="ui-g ui-fluid">
                        <div className="ui-g-12 ui-md-4">
                            <Button onClick={this.showMultiple} label="Multiple" />
                        </div>
                        <div className="ui-g-12 ui-md-4">
                            <Button onClick={this.showSticky} label="Sticky" />
                        </div>
                        <div className="ui-g-12 ui-md-4">
                            <Button onClick={this.clear} icon="fa-close" style={{ float: 'right' }} label="Clear" />
                        </div>
                    </div>

                    <h3>Inline Message CSS</h3>
                    <p>CSS helpers to display inline messages mostly within forms.</p>
                    <div className="ui-g">
                        <div className="ui-g-12 ui-md-3">
                            <Message severity="info" text="PrimeNG Rocks"></Message>
                        </div>
                        <div className="ui-g-12 ui-md-3">
                            <Message severity="success" text="Record Saved"></Message>
                        </div>
                        <div className="ui-g-12 ui-md-3">
                            <Message severity="warn" text="Are you sure?"></Message>
                        </div>
                        <div className="ui-g-12 ui-md-3">
                            <Message severity="error" text="Field is required"></Message>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', paddingLeft: '.5em' }}>
                        <InputText placeholder="Username" className="ng-dirty ng-invalid"/>
                        <Message severity="error" text="Field is required"></Message>
                    </div>
                    <div style={{ marginTop: '30px', paddingLeft: '.5em' }}>
                        <InputText placeholder="Email" className="ng-dirty ng-invalid"/>
                        <Message severity="error"></Message>
                    </div>
                </div>
            </div>
        )
    }
}
