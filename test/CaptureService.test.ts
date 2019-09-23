import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { ApiTypes, masterBackend, CaptureService } from '../src/index';
import { backendNock, toBool, toInt } from './MockHelpers';

use(chaiAsPromised);

describe('CaptureService', () => {
    const requests = {
        AddCaptureCard: <CaptureService.Request.AddCaptureCard>{
            CardType: 'ATSC',
            HostName: '',
            VideoDevice: ''
        },
        AddCardInput: <CaptureService.Request.AddCardInput>{
            CardId: 1,
            SourceId: 1
        },
        GetCaptureCard: <CaptureService.Request.GetCaptureCard>{
            CardId: 1
        },
        GetCaptureCardList: <CaptureService.Request.GetCaptureCardList>{
            CardType: 'ASI'
        },
        RemoveCaptureCard: <CaptureService.Request.RemoveCaptureCard>{
            CardId: 1
        },
        RemoveCardInput: <CaptureService.Request.RemoveCardInput>{
            CardInputId: 1
        },
        UpdateCaptureCard: <CaptureService.Request.UpdateCaptureCard>{
            CardId: 1,
            Setting: '',
            Value: ''
        },
        UpdateCardInput: <CaptureService.Request.UpdateCardInput>{
            CardInputId: 1,
            Setting: '',
            Value: ''
        }
    }
    const responses = {
        GetCaptureCard: <Partial<ApiTypes.CaptureCard>>{
            CardId: 1,
            AudioDevice: 'x'
        },
        GetCaptureCardList: <Partial<ApiTypes.CaptureCard>[]>[
            {
                CardId: 1,
                AudioDevice: 'x'
            }
        ],
        AddCardInput: 1,
        AddCaptureCard: 2
    }
    before(() => {
        backendNock('Capture')
            .post("/AddCaptureCard")
            .query(requests.AddCaptureCard)
            .reply(200, toInt(responses.AddCaptureCard))
            .post("/AddCardInput")
            .query(requests.AddCardInput)
            .reply(200, toInt(responses.AddCardInput))
            .get("/GetCaptureCard")
            .query(requests.GetCaptureCard)
            .reply(200, {
                CaptureCard: responses.GetCaptureCard
            })
            .get("/GetCaptureCardList")
            .query(requests.GetCaptureCardList)
            .reply(200, {
                CaptureCardList: {
                    CaptureCards: responses.GetCaptureCardList
                }
            })
            .post("/RemoveCaptureCard")
            .query(requests.RemoveCaptureCard)
            .reply(200, toBool(true))
            .post("/RemoveCardInput")
            .query(requests.RemoveCardInput)
            .reply(200, toBool(true))
            .post("/UpdateCaptureCard")
            .query(requests.UpdateCaptureCard)
            .reply(200, toBool(true))
            .post("/UpdateCardInput")
            .query(requests.UpdateCardInput)
            .reply(200, toBool(true))

    })

    it('AddCaptureCard', async () => {
        await expect(masterBackend.captureService.AddCaptureCard(requests.AddCaptureCard))
            .to.eventually.eql(responses.AddCaptureCard)
    })
    it('AddCardInput', async () => {
        await expect(masterBackend.captureService.AddCardInput(requests.AddCardInput))
            .to.eventually.eql(responses.AddCardInput)
    })

    it('GetCaptureCard', async () => {
        await expect(masterBackend.captureService.GetCaptureCard(requests.GetCaptureCard))
            .to.eventually.eql(responses.GetCaptureCard)
    })
    it('GetCaptureCardList', async () => {
        await expect(masterBackend.captureService.GetCaptureCardList(requests.GetCaptureCardList))
            .to.eventually.eql(responses.GetCaptureCardList)
    })
    it('RemoveCaptureCard', async () => {
        await masterBackend.captureService.RemoveCaptureCard(requests.RemoveCaptureCard)
    })
    it('RemoveCardInput', async () => {
        await masterBackend.captureService.RemoveCardInput(requests.RemoveCardInput)
    })
    it('UpdateCaptureCard', async () => {
        await masterBackend.captureService.UpdateCaptureCard(requests.UpdateCaptureCard)
    })
    it('UpdateCardInput', async () => {
        await masterBackend.captureService.UpdateCardInput(requests.UpdateCardInput)
    })
})