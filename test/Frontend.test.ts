import * as nock from 'nock';
import { expect, should, assert } from 'chai';
import 'mocha';
import { backendNock, toString, toBool } from './MockHelpers'
import { frontend, Frontend, PriorityType, NotificationType, VisibilityType } from '../src/'
describe('Frontend', () => {
    before(() => {
        backendNock('Myth')
            .get('/GetSetting')
            .query({
                Key: 'FrontendStatusPort',
                HostName: 'testgoodfe',
                Default: 6547
            }).reply(200, () => {
                return toString('6547');
            })
            .get('/GetSetting')
            .query({
                Key: 'Theme',
                HostName: 'testgoodfe'
            }).reply(200, () => {
                return toString('ATheme');
            }).get('/GetSetting')
            .query({
                Key: 'FrontendStatusPort',
                HostName: 'testbadfe',
                Default: 6547
            }).reply(200, () => {
                return toString('6547');
            })
            .get('/GetSetting')
            .query({
                Key: 'Theme',
                HostName: 'testbadfe'
            }).reply(200, () => {
                return toString('');
            })

        nock('http://localhost:6547/Frontend')
            .get('/GetActionList').reply(200, () => {
                return {
                    FrontendActionList: {
                        ActionList: {
                            testKey: 'testValue'
                        }
                    }
                }
            }).get('/GetStatus').reply(200, () => {
                return {
                    FrontendStatus: {
                        Name: 'testfe'
                    }
                }
            }).post('/PlayRecording')
            .query({
                ChanId: 12,
                RecordedId: 1
            }).reply(200, () => {
                return toBool(true);
            }).post('/PlayVideo')
            .query({
                Id: 1,
                UseBookmark: false
            }).reply(200, () => {
                return toBool(true);
            }).post('/SendAction')
            .query({
                Action: 'Test'
            }).reply(200, () => {
                return toBool(true);
            }).post('/SendKey')
            .query({
                Key: 'Test'
            }).reply(200, () => {
                return toBool(true);
            }).post('/SendMessage')
            .query({
                Message: 'Test'
            }).reply(200, () => {
                return toBool(true);
            }).get('/GetContextList').reply(200, () => {
                return {
                    StringList: [
                        "test"
                    ]
                }
            }).post('/SendKey')
            .query({
                Key: 'Fail'
            }).reply(200, () => {
                return toBool(false);
            }).post('/SendNotification')
            .query({
                Message: 'Test Message',
                Priority: 3,
                Type: 'busy',
                Visibility: 40
            })
            .reply(200, () => {
                return toBool(true);
            })

    })
    it('Create Valid Frontend', async () => {
        const fe = await frontend("testgoodfe");
        expect(fe.hostname()).to.equal('testgoodfe');
    })
    it('Create Invalid Frontend', async () => {
        let isError: boolean = false;
        try {
            const fe = await frontend("testbadfe");
        } catch (err) {
            isError = true
            expect(err).to.contain('Invalid');
        }
        assert.isTrue(isError, 'Call Should Throw Exception');
    })

    it('GetActionList', async () => {
        const fe = createFrontend();
        expect(await fe.GetActionList()).to.have.property('testKey', 'testValue');
    })

    it('GetStatus', async () => {
        const fe = createFrontend();
        expect(await fe.GetStatus()).to.have.property('Name', 'testfe');
    })

    it('PlayRecording', async () => {
        const fe = createFrontend();
        expect(await fe.PlayRecording({
            ChanId: 12,
            RecordedId: 1
        })).to.equal(undefined);
    })

    it('PlayVideo', async () => {
        const fe = createFrontend();
        expect(await fe.PlayVideo({
            Id: '1',
            UseBookmark: false
        })).to.equal(undefined);
    })

    it('SendAction', async () => {
        const fe = createFrontend();
        expect(await fe.SendAction({
            Action: 'Test'
        })).to.equal(undefined);
    })

    it('SendKey', async () => {
        const fe = createFrontend();
        expect(await fe.SendKey({
            Key: 'Test'
        })).to.equal(undefined);
    })

    it('SendMessage', async () => {
        const fe = createFrontend();
        expect(await fe.SendMessage({
            Message: 'Test'
        })).to.equal(undefined);
    })

    it('GetContextList', async () => {
        const fe = createFrontend();
        expect(await fe.GetContextList()).to.have.members(['test']);
    })

    it('SendNotification', async () => {
        const fe = createFrontend();

        expect(await fe.SendNotification({
            Message: 'Test Message',
            Priority: PriorityType.high,
            Type: NotificationType.busy,
            Visibility: VisibilityType.video_library | VisibilityType.recordings_library
        })).to.equal(undefined);
    })

    it('Bool Fail', async () => {
        const fe = createFrontend();
        let isError: boolean = false;
        try {
            await fe.SendKey({
                Key: 'Fail'
            })
        } catch (err) {
            isError = true;
            expect(err).to.contain('Failed')
        }
        assert.isTrue(isError, 'Call Should Throw Exception');
    })
})

function createFrontend() {
    return new Frontend({
        hostname: 'localhost',
        port: 6547,
        protocol: 'http'
    })

}