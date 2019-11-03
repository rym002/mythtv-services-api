import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as nock from 'nock';
import { frontend, Frontend, ApiTypes, getFrontendServices } from '../src/';
import { backendNock, toBool, toString, toStringList } from './MockHelpers';

use(chaiAsPromised);

describe('Frontend', () => {
    const requests = {
        GetActionList: <Frontend.Request.GetActionList>{
            Context: 'GetActionList'
        },
        PlayRecording: <Frontend.Request.PlayRecording>{
            RecordedId: 1
        },
        PlayVideo: <Frontend.Request.PlayVideo>{
            Id: '1'
        },
        SendAction: <Frontend.Request.SendAction>{
            Action: 'SendAction'
        },
        SendActionFalse: <Frontend.Request.SendAction>{
            Action: 'SendActionFalse'
        },
        SendKey: <Frontend.Request.SendKey>{
            Key: 'SendKey'
        },
        SendMessage: <Frontend.Request.SendMessage>{
            Message: 'SendMessage'
        },
        SendNotification: <Frontend.Request.SendNotification>{
            Message: 'SendNotification',
            Priority: Frontend.Request.PriorityType.high,
            Type: Frontend.Request.NotificationType.busy,
            Visibility: Frontend.Request.VisibilityType.video_library | Frontend.Request.VisibilityType.recordings_library
        }
    }
    const responses = {
        GetActionList: <ApiTypes.StringKeyValue>{
            'GetActionList': 'GetActionList'
        },
        GetContextList: ['GetContextList', 'GetContextList2'],
        GetStatus: <Partial<ApiTypes.FrontendStatus>>{
            Name: 'GetStatus'
        }
    }
    before(() => {
        backendNock('Myth')
            .get('/GetSetting')
            .query({
                Key: 'FrontendStatusPort',
                HostName: 'testgoodfe',
                Default: 6547
            })
            .reply(200, toString('6547'))
            .get('/GetFrontends')
            .query({
                OnLine: true
            })
            .reply(200, {
                FrontendList: {
                    Frontends: [{
                        Name: 'testfe',
                        Port: 123
                    }]
                }
            })


        nock('http://localhost:6547/Frontend')
            .get('/GetActionList')
            .query(requests.GetActionList)
            .reply(200, () => {
                return {
                    FrontendActionList: {
                        ActionList: responses.GetActionList
                    }
                }
            })
            .get('/GetStatus')
            .reply(200, () => {
                return {
                    FrontendStatus: responses.GetStatus
                }
            })
            .post('/PlayRecording')
            .query(requests.PlayRecording)
            .reply(200, () => {
                return toBool(true);
            })
            .post('/PlayVideo')
            .query(requests.PlayVideo)
            .reply(200, toBool(true))
            .post('/SendAction')
            .query(requests.SendAction)
            .reply(200, toBool(true))
            .post('/SendAction')
            .query(requests.SendActionFalse)
            .twice()
            .reply(200, toBool(false))
            .post('/SendKey')
            .query(requests.SendKey)
            .reply(200, toBool(true))
            .post('/SendMessage')
            .query(requests.SendMessage)
            .reply(200, toBool(true))
            .get('/GetContextList')
            .reply(200, toStringList(responses.GetContextList))
            .post('/SendNotification')
            .query(requests.SendNotification)
            .reply(200, toBool(true))

    })
    it('Create Frontend', async () => {
        const fe = await frontend("testgoodfe");
        expect(fe.hostname()).to.equal('testgoodfe');
    })

    it('GetActionList', async () => {
        const fe = createFrontend();
        await expect(fe.GetActionList(requests.GetActionList))
            .to.eventually.eql(responses.GetActionList)
    })

    it('GetStatus', async () => {
        const fe = createFrontend();
        await expect(fe.GetStatus())
            .to.eventually.eql(responses.GetStatus)
    })

    it('PlayRecording', async () => {
        const fe = createFrontend();
        await fe.PlayRecording(requests.PlayRecording);
    })

    it('PlayVideo', async () => {
        const fe = createFrontend();
        await fe.PlayVideo(requests.PlayVideo);
    })

    it('SendAction', async () => {
        const fe = createFrontend();
        await fe.SendAction(requests.SendAction);
    })

    it('SendAction should fail on false', async () => {
        const fe = createFrontend();
        await expect(fe.SendAction(requests.SendActionFalse))
            .to.eventually.be.rejectedWith('', 'should reject');
    })
    it('SendAction should not throw exception when ignoreError is true', async () => {
        const fe = createFrontend();
        await fe.SendAction(requests.SendActionFalse, true);
    })
    it('SendKey', async () => {
        const fe = createFrontend();
        await fe.SendKey(requests.SendKey);
    })

    it('SendMessage', async () => {
        const fe = createFrontend();
        await fe.SendMessage(requests.SendMessage);
    })

    it('GetContextList', async () => {
        const fe = createFrontend();
        await expect(fe.GetContextList())
            .to.eventually.eql(responses.GetContextList)
    })

    it('SendNotification', async () => {
        const fe = createFrontend();
        await fe.SendNotification(requests.SendNotification);
    })

    it('should create frontends', async () => {
        const frontends = await getFrontendServices(true)
        expect(frontends).to.have.length(1)
        expect(frontends[0].hostname()).to.eql('testfe')
    })

})

function createFrontend() {
    return new Frontend.Service(new URL('http://localhost:6547'), 'localhost')
}