import React, { Component } from "react";
import "./payment.css"


const StripePayment = () => {
  return (
    <div id="DIV_1">
      <div id="DIV_2">
        <div id="DIV_3">
          <header id="HEADER_4">
            <div id="DIV_5">
              <div id="DIV_6">
                <a href="http://localhost:3000/checkout?canceled=true" title="Testing Account" id="A_7"></a>
                <div id="DIV_8">
                  <div id="DIV_9">
                    <div id="DIV_10">
                      <svg id="svg_11">
                        <path id="path_12">
                        </path>
                      </svg>
                    </div>
                    <div id="DIV_13">
                      <div id="DIV_14">
                        <div id="DIV_15">
                          <svg id="svg_16">
                            <path id="path_17">
                            </path>
                          </svg>
                        </div><span id="SPAN_18">Back</span>
                        <h1 id="H1_19">
                          Testing Account
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="DIV_20">
                  <div id="DIV_21">
                    <span id="SPAN_22">Test Mode</span>
                  </div>
                  <div id="DIV_23">
                    <span id="SPAN_24">Test</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div id="DIV_25">
            <div id="DIV_26">
              <div id="DIV_27">
                <div id="DIV_28">
                  <img src="https://d1wqzb5bdbcre6.cloudfront.net/52398e185dc774e1b3c0090e3bd35d6af24b6b05/68747470733a2f2f692e696d6775722e636f6d2f45487952326e502e706e67" alt="Product" id="IMG_29" />
                </div>
              </div>
              <div id="DIV_30">
                <span id="SPAN_31">Stubborn Attachments</span><span id="SPAN_32">$20.00</span><span id="SPAN_33"></span>
                <div id="DIV_34">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="DIV_35">
          <div id="DIV_36">
            <div id="DIV_37">
              <div id="DIV_38">
                <div id="DIV_39">
                  <div id="DIV_40">
                    Pay with card
                  </div>
                </div>
              </div>
              <div id="DIV_41">
              </div>
            </div>
            <form id="FORM_42">
              <div id="DIV_43">
                <div id="DIV_44">
                  <div id="DIV_45">
                    <div id="DIV_46">
                      <label for="email" id="LABEL_47">
                        <span id="SPAN_48">Email</span>
                      </label>
                    </div>
                    <div id="DIV_49">
                      <div id="DIV_50">
                        <div id="DIV_51">
                          <div id="DIV_52">
                            <span id="SPAN_53"><input id="INPUT_54" name="email" type="text" /></span>
                          </div>
                        </div>
                        <div id="DIV_55">
                          <span id="SPAN_56"><span id="SPAN_57"></span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="DIV_58">
                <div id="DIV_59">
                  <div id="DIV_60">
                    <div id="DIV_61">
                      <label for="cardNumber-fieldset" id="LABEL_62">
                        <span id="SPAN_63">Card information</span>
                      </label>
                    </div>
                    <fieldset id="FIELDSET_64">
                      <div id="DIV_65">
                        <div id="DIV_66">
                          <div id="DIV_67">
                            <span id="SPAN_68"><input id="INPUT_69" name="cardNumber" type="text" placeholder="1234 1234 1234 1234" /></span>
                            <div id="DIV_70">
                              <div id="DIV_71">
                                <span id="SPAN_72"><img src="https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg" alt="visa" id="IMG_73" /></span>
                              </div>
                              <div id="DIV_74">
                                <span id="SPAN_75"><img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="mastercard" id="IMG_76" /></span>
                              </div>
                              <div id="DIV_77">
                                <span id="SPAN_78"><img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="amex" id="IMG_79" /></span>
                              </div>
                              <div id="DIV_80">
                                <span id="SPAN_81"><span id="SPAN_82"><img src="https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg" alt="unionpay" id="IMG_83" /></span></span><span id="SPAN_84"><span id="SPAN_85"><img src="https://js.stripe.com/v3/fingerprinted/img/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg" alt="jcb" id="IMG_86" /></span></span><span id="SPAN_87"><span id="SPAN_88"><img src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg" alt="discover" id="IMG_89" /></span></span><span id="SPAN_90"><span id="SPAN_91"><img src="https://js.stripe.com/v3/fingerprinted/img/diners-fbcbd3360f8e3f629cdaa80e93abdb8b.svg" alt="diners" id="IMG_92" /></span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_93">
                          <div id="DIV_94">
                            <span id="SPAN_95"><input id="INPUT_96" name="cardExpiry" type="text" placeholder="MM / YY" /></span>
                          </div>
                        </div>
                        <div id="DIV_97">
                          <div id="DIV_98">
                            <span id="SPAN_99"><input id="INPUT_100" name="cardCvc" type="text" placeholder="CVC" /></span>
                            <div id="DIV_101">
                              <svg id="svg_102">
                                <g id="g_103">
                                  <g id="g_104">
                                    <g id="g_105">
                                      <path id="path_106">
                                      </path>
                                      <path id="path_107">
                                      </path>
                                    </g>
                                    <g id="g_108">
                                      <path id="path_109">
                                      </path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_110">
                          <span id="SPAN_111"><span id="SPAN_112"></span></span>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div id="DIV_113">
                  <div id="DIV_114">
                    <div id="DIV_115">
                      <div id="DIV_116">
                        <div id="DIV_117">
                          <div id="DIV_118">
                            <label for="billingName" id="LABEL_119">
                              <span id="SPAN_120">Name on card</span>
                            </label>
                          </div>
                          <div id="DIV_121">
                            <div id="DIV_122">
                              <div id="DIV_123">
                                <div id="DIV_124">
                                  <span id="SPAN_125"><input id="INPUT_126" name="billingName" type="text" /></span>
                                </div>
                              </div>
                              <div id="DIV_127">
                                <span id="SPAN_128"><span id="SPAN_129"></span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="DIV_130">
                        <div id="DIV_131">
                          <div id="DIV_132">
                            <label for="country" id="LABEL_133">
                              <span id="SPAN_134">Country or region</span>
                            </label>
                          </div>
                          <div id="DIV_135">
                            <div id="DIV_136">
                              <div id="DIV_137">
                                <div id="DIV_138">
                                  <div id="DIV_139">
                                    <div id="DIV_140">
                                      <select id="SELECT_141" name="billingCountry">
                                        <option id="OPTION_142">
                                        </option>
                                        <option value="AF" id="OPTION_143">
                                          Afghanistan
                                        </option>
                                        <option value="AX" id="OPTION_144">
                                          Åland Islands
                                        </option>
                                        <option value="AL" id="OPTION_145">
                                          Albania
                                        </option>
                                        <option value="DZ" id="OPTION_146">
                                          Algeria
                                        </option>
                                        <option value="AD" id="OPTION_147">
                                          Andorra
                                        </option>
                                        <option value="AO" id="OPTION_148">
                                          Angola
                                        </option>
                                        <option value="AI" id="OPTION_149">
                                          Anguilla
                                        </option>
                                        <option value="AQ" id="OPTION_150">
                                          Antarctica
                                        </option>
                                        <option value="AG" id="OPTION_151">
                                          Antigua &amp; Barbuda
                                        </option>
                                        <option value="AR" id="OPTION_152">
                                          Argentina
                                        </option>
                                        <option value="AM" id="OPTION_153">
                                          Armenia
                                        </option>
                                        <option value="AW" id="OPTION_154">
                                          Aruba
                                        </option>
                                        <option value="AC" id="OPTION_155">
                                          Ascension Island
                                        </option>
                                        <option value="AU" id="OPTION_156">
                                          Australia
                                        </option>
                                        <option value="AT" id="OPTION_157">
                                          Austria
                                        </option>
                                        <option value="AZ" id="OPTION_158">
                                          Azerbaijan
                                        </option>
                                        <option value="BS" id="OPTION_159">
                                          Bahamas
                                        </option>
                                        <option value="BH" id="OPTION_160">
                                          Bahrain
                                        </option>
                                        <option value="BD" id="OPTION_161">
                                          Bangladesh
                                        </option>
                                        <option value="BB" id="OPTION_162">
                                          Barbados
                                        </option>
                                        <option value="BY" id="OPTION_163">
                                          Belarus
                                        </option>
                                        <option value="BE" id="OPTION_164">
                                          Belgium
                                        </option>
                                        <option value="BZ" id="OPTION_165">
                                          Belize
                                        </option>
                                        <option value="BJ" id="OPTION_166">
                                          Benin
                                        </option>
                                        <option value="BM" id="OPTION_167">
                                          Bermuda
                                        </option>
                                        <option value="BT" id="OPTION_168">
                                          Bhutan
                                        </option>
                                        <option value="BO" id="OPTION_169">
                                          Bolivia
                                        </option>
                                        <option value="BA" id="OPTION_170">
                                          Bosnia &amp; Herzegovina
                                        </option>
                                        <option value="BW" id="OPTION_171">
                                          Botswana
                                        </option>
                                        <option value="BV" id="OPTION_172">
                                          Bouvet Island
                                        </option>
                                        <option value="BR" id="OPTION_173">
                                          Brazil
                                        </option>
                                        <option value="IO" id="OPTION_174">
                                          British Indian Ocean Territory
                                        </option>
                                        <option value="VG" id="OPTION_175">
                                          British Virgin Islands
                                        </option>
                                        <option value="BN" id="OPTION_176">
                                          Brunei
                                        </option>
                                        <option value="BG" id="OPTION_177">
                                          Bulgaria
                                        </option>
                                        <option value="BF" id="OPTION_178">
                                          Burkina Faso
                                        </option>
                                        <option value="BI" id="OPTION_179">
                                          Burundi
                                        </option>
                                        <option value="KH" id="OPTION_180">
                                          Cambodia
                                        </option>
                                        <option value="CM" id="OPTION_181">
                                          Cameroon
                                        </option>
                                        <option value="CA" id="OPTION_182">
                                          Canada
                                        </option>
                                        <option value="CV" id="OPTION_183">
                                          Cape Verde
                                        </option>
                                        <option value="BQ" id="OPTION_184">
                                          Caribbean Netherlands
                                        </option>
                                        <option value="KY" id="OPTION_185">
                                          Cayman Islands
                                        </option>
                                        <option value="CF" id="OPTION_186">
                                          Central African Republic
                                        </option>
                                        <option value="TD" id="OPTION_187">
                                          Chad
                                        </option>
                                        <option value="CL" id="OPTION_188">
                                          Chile
                                        </option>
                                        <option value="CN" id="OPTION_189">
                                          China
                                        </option>
                                        <option value="CO" id="OPTION_190">
                                          Colombia
                                        </option>
                                        <option value="KM" id="OPTION_191">
                                          Comoros
                                        </option>
                                        <option value="CG" id="OPTION_192">
                                          Congo - Brazzaville
                                        </option>
                                        <option value="CD" id="OPTION_193">
                                          Congo - Kinshasa
                                        </option>
                                        <option value="CK" id="OPTION_194">
                                          Cook Islands
                                        </option>
                                        <option value="CR" id="OPTION_195">
                                          Costa Rica
                                        </option>
                                        <option value="CI" id="OPTION_196">
                                          Côte d’Ivoire
                                        </option>
                                        <option value="HR" id="OPTION_197">
                                          Croatia
                                        </option>
                                        <option value="CW" id="OPTION_198">
                                          Curaçao
                                        </option>
                                        <option value="CY" id="OPTION_199">
                                          Cyprus
                                        </option>
                                        <option value="CZ" id="OPTION_200">
                                          Czechia
                                        </option>
                                        <option value="DK" id="OPTION_201">
                                          Denmark
                                        </option>
                                        <option value="DJ" id="OPTION_202">
                                          Djibouti
                                        </option>
                                        <option value="DM" id="OPTION_203">
                                          Dominica
                                        </option>
                                        <option value="DO" id="OPTION_204">
                                          Dominican Republic
                                        </option>
                                        <option value="EC" id="OPTION_205">
                                          Ecuador
                                        </option>
                                        <option value="EG" id="OPTION_206">
                                          Egypt
                                        </option>
                                        <option value="SV" id="OPTION_207">
                                          El Salvador
                                        </option>
                                        <option value="GQ" id="OPTION_208">
                                          Equatorial Guinea
                                        </option>
                                        <option value="ER" id="OPTION_209">
                                          Eritrea
                                        </option>
                                        <option value="EE" id="OPTION_210">
                                          Estonia
                                        </option>
                                        <option value="SZ" id="OPTION_211">
                                          Eswatini
                                        </option>
                                        <option value="ET" id="OPTION_212">
                                          Ethiopia
                                        </option>
                                        <option value="FK" id="OPTION_213">
                                          Falkland Islands
                                        </option>
                                        <option value="FO" id="OPTION_214">
                                          Faroe Islands
                                        </option>
                                        <option value="FJ" id="OPTION_215">
                                          Fiji
                                        </option>
                                        <option value="FI" id="OPTION_216">
                                          Finland
                                        </option>
                                        <option value="FR" id="OPTION_217">
                                          France
                                        </option>
                                        <option value="GF" id="OPTION_218">
                                          French Guiana
                                        </option>
                                        <option value="PF" id="OPTION_219">
                                          French Polynesia
                                        </option>
                                        <option value="TF" id="OPTION_220">
                                          French Southern Territories
                                        </option>
                                        <option value="GA" id="OPTION_221">
                                          Gabon
                                        </option>
                                        <option value="GM" id="OPTION_222">
                                          Gambia
                                        </option>
                                        <option value="GE" id="OPTION_223">
                                          Georgia
                                        </option>
                                        <option value="DE" id="OPTION_224">
                                          Germany
                                        </option>
                                        <option value="GH" id="OPTION_225">
                                          Ghana
                                        </option>
                                        <option value="GI" id="OPTION_226">
                                          Gibraltar
                                        </option>
                                        <option value="GR" id="OPTION_227">
                                          Greece
                                        </option>
                                        <option value="GL" id="OPTION_228">
                                          Greenland
                                        </option>
                                        <option value="GD" id="OPTION_229">
                                          Grenada
                                        </option>
                                        <option value="GP" id="OPTION_230">
                                          Guadeloupe
                                        </option>
                                        <option value="GU" id="OPTION_231">
                                          Guam
                                        </option>
                                        <option value="GT" id="OPTION_232">
                                          Guatemala
                                        </option>
                                        <option value="GG" id="OPTION_233">
                                          Guernsey
                                        </option>
                                        <option value="GN" id="OPTION_234">
                                          Guinea
                                        </option>
                                        <option value="GW" id="OPTION_235">
                                          Guinea-Bissau
                                        </option>
                                        <option value="GY" id="OPTION_236">
                                          Guyana
                                        </option>
                                        <option value="HT" id="OPTION_237">
                                          Haiti
                                        </option>
                                        <option value="HN" id="OPTION_238">
                                          Honduras
                                        </option>
                                        <option value="HK" id="OPTION_239">
                                          Hong Kong SAR China
                                        </option>
                                        <option value="HU" id="OPTION_240">
                                          Hungary
                                        </option>
                                        <option value="IS" id="OPTION_241">
                                          Iceland
                                        </option>
                                        <option value="IN" id="OPTION_242">
                                          India
                                        </option>
                                        <option value="ID" id="OPTION_243">
                                          Indonesia
                                        </option>
                                        <option value="IQ" id="OPTION_244">
                                          Iraq
                                        </option>
                                        <option value="IE" id="OPTION_245">
                                          Ireland
                                        </option>
                                        <option value="IM" id="OPTION_246">
                                          Isle of Man
                                        </option>
                                        <option value="IL" id="OPTION_247">
                                          Israel
                                        </option>
                                        <option value="IT" id="OPTION_248">
                                          Italy
                                        </option>
                                        <option value="JM" id="OPTION_249">
                                          Jamaica
                                        </option>
                                        <option value="JP" id="OPTION_250">
                                          Japan
                                        </option>
                                        <option value="JE" id="OPTION_251">
                                          Jersey
                                        </option>
                                        <option value="JO" id="OPTION_252">
                                          Jordan
                                        </option>
                                        <option value="KZ" id="OPTION_253">
                                          Kazakhstan
                                        </option>
                                        <option value="KE" id="OPTION_254">
                                          Kenya
                                        </option>
                                        <option value="KI" id="OPTION_255">
                                          Kiribati
                                        </option>
                                        <option value="XK" id="OPTION_256">
                                          Kosovo
                                        </option>
                                        <option value="KW" id="OPTION_257">
                                          Kuwait
                                        </option>
                                        <option value="KG" id="OPTION_258">
                                          Kyrgyzstan
                                        </option>
                                        <option value="LA" id="OPTION_259">
                                          Laos
                                        </option>
                                        <option value="LV" id="OPTION_260">
                                          Latvia
                                        </option>
                                        <option value="LB" id="OPTION_261">
                                          Lebanon
                                        </option>
                                        <option value="LS" id="OPTION_262">
                                          Lesotho
                                        </option>
                                        <option value="LR" id="OPTION_263">
                                          Liberia
                                        </option>
                                        <option value="LY" id="OPTION_264">
                                          Libya
                                        </option>
                                        <option value="LI" id="OPTION_265">
                                          Liechtenstein
                                        </option>
                                        <option value="LT" id="OPTION_266">
                                          Lithuania
                                        </option>
                                        <option value="LU" id="OPTION_267">
                                          Luxembourg
                                        </option>
                                        <option value="MO" id="OPTION_268">
                                          Macao SAR China
                                        </option>
                                        <option value="MG" id="OPTION_269">
                                          Madagascar
                                        </option>
                                        <option value="MW" id="OPTION_270">
                                          Malawi
                                        </option>
                                        <option value="MY" id="OPTION_271">
                                          Malaysia
                                        </option>
                                        <option value="MV" id="OPTION_272">
                                          Maldives
                                        </option>
                                        <option value="ML" id="OPTION_273">
                                          Mali
                                        </option>
                                        <option value="MT" id="OPTION_274">
                                          Malta
                                        </option>
                                        <option value="MQ" id="OPTION_275">
                                          Martinique
                                        </option>
                                        <option value="MR" id="OPTION_276">
                                          Mauritania
                                        </option>
                                        <option value="MU" id="OPTION_277">
                                          Mauritius
                                        </option>
                                        <option value="YT" id="OPTION_278">
                                          Mayotte
                                        </option>
                                        <option value="MX" id="OPTION_279">
                                          Mexico
                                        </option>
                                        <option value="MD" id="OPTION_280">
                                          Moldova
                                        </option>
                                        <option value="MC" id="OPTION_281">
                                          Monaco
                                        </option>
                                        <option value="MN" id="OPTION_282">
                                          Mongolia
                                        </option>
                                        <option value="ME" id="OPTION_283">
                                          Montenegro
                                        </option>
                                        <option value="MS" id="OPTION_284">
                                          Montserrat
                                        </option>
                                        <option value="MA" id="OPTION_285">
                                          Morocco
                                        </option>
                                        <option value="MZ" id="OPTION_286">
                                          Mozambique
                                        </option>
                                        <option value="MM" id="OPTION_287">
                                          Myanmar (Burma)
                                        </option>
                                        <option value="NA" id="OPTION_288">
                                          Namibia
                                        </option>
                                        <option value="NR" id="OPTION_289">
                                          Nauru
                                        </option>
                                        <option value="NP" id="OPTION_290">
                                          Nepal
                                        </option>
                                        <option value="NL" id="OPTION_291">
                                          Netherlands
                                        </option>
                                        <option value="NC" id="OPTION_292">
                                          New Caledonia
                                        </option>
                                        <option value="NZ" id="OPTION_293">
                                          New Zealand
                                        </option>
                                        <option value="NI" id="OPTION_294">
                                          Nicaragua
                                        </option>
                                        <option value="NE" id="OPTION_295">
                                          Niger
                                        </option>
                                        <option value="NG" id="OPTION_296">
                                          Nigeria
                                        </option>
                                        <option value="NU" id="OPTION_297">
                                          Niue
                                        </option>
                                        <option value="MK" id="OPTION_298">
                                          North Macedonia
                                        </option>
                                        <option value="NO" id="OPTION_299">
                                          Norway
                                        </option>
                                        <option value="OM" id="OPTION_300">
                                          Oman
                                        </option>
                                        <option value="PK" id="OPTION_301">
                                          Pakistan
                                        </option>
                                        <option value="PS" id="OPTION_302">
                                          Palestinian Territories
                                        </option>
                                        <option value="PA" id="OPTION_303">
                                          Panama
                                        </option>
                                        <option value="PG" id="OPTION_304">
                                          Papua New Guinea
                                        </option>
                                        <option value="PY" id="OPTION_305">
                                          Paraguay
                                        </option>
                                        <option value="PE" id="OPTION_306">
                                          Peru
                                        </option>
                                        <option value="PH" id="OPTION_307">
                                          Philippines
                                        </option>
                                        <option value="PN" id="OPTION_308">
                                          Pitcairn Islands
                                        </option>
                                        <option value="PL" id="OPTION_309">
                                          Poland
                                        </option>
                                        <option value="PT" id="OPTION_310">
                                          Portugal
                                        </option>
                                        <option value="PR" id="OPTION_311">
                                          Puerto Rico
                                        </option>
                                        <option value="QA" id="OPTION_312">
                                          Qatar
                                        </option>
                                        <option value="KR" id="OPTION_313">
                                          Republic of Korea
                                        </option>
                                        <option value="RE" id="OPTION_314">
                                          Réunion
                                        </option>
                                        <option value="RO" id="OPTION_315">
                                          Romania
                                        </option>
                                        <option value="RU" id="OPTION_316">
                                          Russia
                                        </option>
                                        <option value="RW" id="OPTION_317">
                                          Rwanda
                                        </option>
                                        <option value="WS" id="OPTION_318">
                                          Samoa
                                        </option>
                                        <option value="SM" id="OPTION_319">
                                          San Marino
                                        </option>
                                        <option value="ST" id="OPTION_320">
                                          São Tomé &amp; Príncipe
                                        </option>
                                        <option value="SA" id="OPTION_321">
                                          Saudi Arabia
                                        </option>
                                        <option value="SN" id="OPTION_322">
                                          Senegal
                                        </option>
                                        <option value="RS" id="OPTION_323">
                                          Serbia
                                        </option>
                                        <option value="SC" id="OPTION_324">
                                          Seychelles
                                        </option>
                                        <option value="SL" id="OPTION_325">
                                          Sierra Leone
                                        </option>
                                        <option value="SG" id="OPTION_326">
                                          Singapore
                                        </option>
                                        <option value="SX" id="OPTION_327">
                                          Sint Maarten
                                        </option>
                                        <option value="SK" id="OPTION_328">
                                          Slovakia
                                        </option>
                                        <option value="SI" id="OPTION_329">
                                          Slovenia
                                        </option>
                                        <option value="SB" id="OPTION_330">
                                          Solomon Islands
                                        </option>
                                        <option value="SO" id="OPTION_331">
                                          Somalia
                                        </option>
                                        <option value="ZA" id="OPTION_332">
                                          South Africa
                                        </option>
                                        <option value="GS" id="OPTION_333">
                                          South Georgia &amp; South Sandwich Islands
                                        </option>
                                        <option value="SS" id="OPTION_334">
                                          South Sudan
                                        </option>
                                        <option value="ES" id="OPTION_335">
                                          Spain
                                        </option>
                                        <option value="LK" id="OPTION_336">
                                          Sri Lanka
                                        </option>
                                        <option value="BL" id="OPTION_337">
                                          St. Barthélemy
                                        </option>
                                        <option value="SH" id="OPTION_338">
                                          St. Helena
                                        </option>
                                        <option value="KN" id="OPTION_339">
                                          St. Kitts &amp; Nevis
                                        </option>
                                        <option value="LC" id="OPTION_340">
                                          St. Lucia
                                        </option>
                                        <option value="MF" id="OPTION_341">
                                          St. Martin
                                        </option>
                                        <option value="PM" id="OPTION_342">
                                          St. Pierre &amp; Miquelon
                                        </option>
                                        <option value="VC" id="OPTION_343">
                                          St. Vincent &amp; Grenadines
                                        </option>
                                        <option value="SR" id="OPTION_344">
                                          Suriname
                                        </option>
                                        <option value="SJ" id="OPTION_345">
                                          Svalbard &amp; Jan Mayen
                                        </option>
                                        <option value="SE" id="OPTION_346">
                                          Sweden
                                        </option>
                                        <option value="CH" id="OPTION_347">
                                          Switzerland
                                        </option>
                                        <option value="TW" id="OPTION_348">
                                          Taiwan
                                        </option>
                                        <option value="TJ" id="OPTION_349">
                                          Tajikistan
                                        </option>
                                        <option value="TZ" id="OPTION_350">
                                          Tanzania
                                        </option>
                                        <option value="TH" id="OPTION_351">
                                          Thailand
                                        </option>
                                        <option value="TL" id="OPTION_352">
                                          Timor-Leste
                                        </option>
                                        <option value="TG" id="OPTION_353">
                                          Togo
                                        </option>
                                        <option value="TK" id="OPTION_354">
                                          Tokelau
                                        </option>
                                        <option value="TO" id="OPTION_355">
                                          Tonga
                                        </option>
                                        <option value="TT" id="OPTION_356">
                                          Trinidad &amp; Tobago
                                        </option>
                                        <option value="TA" id="OPTION_357">
                                          Tristan da Cunha
                                        </option>
                                        <option value="TN" id="OPTION_358">
                                          Tunisia
                                        </option>
                                        <option value="TR" id="OPTION_359">
                                          Turkey
                                        </option>
                                        <option value="TM" id="OPTION_360">
                                          Turkmenistan
                                        </option>
                                        <option value="TC" id="OPTION_361">
                                          Turks &amp; Caicos Islands
                                        </option>
                                        <option value="TV" id="OPTION_362">
                                          Tuvalu
                                        </option>
                                        <option value="UG" id="OPTION_363">
                                          Uganda
                                        </option>
                                        <option value="UA" id="OPTION_364">
                                          Ukraine
                                        </option>
                                        <option value="AE" id="OPTION_365">
                                          United Arab Emirates
                                        </option>
                                        <option value="GB" id="OPTION_366">
                                          United Kingdom
                                        </option>
                                        <option value="US" id="OPTION_367">
                                          United States
                                        </option>
                                        <option value="UY" id="OPTION_368">
                                          Uruguay
                                        </option>
                                        <option value="UZ" id="OPTION_369">
                                          Uzbekistan
                                        </option>
                                        <option value="VU" id="OPTION_370">
                                          Vanuatu
                                        </option>
                                        <option value="VA" id="OPTION_371">
                                          Vatican City
                                        </option>
                                        <option value="VE" id="OPTION_372">
                                          Venezuela
                                        </option>
                                        <option value="VN" id="OPTION_373">
                                          Vietnam
                                        </option>
                                        <option value="WF" id="OPTION_374">
                                          Wallis &amp; Futuna
                                        </option>
                                        <option value="EH" id="OPTION_375">
                                          Western Sahara
                                        </option>
                                        <option value="YE" id="OPTION_376">
                                          Yemen
                                        </option>
                                        <option value="ZM" id="OPTION_377">
                                          Zambia
                                        </option>
                                        <option value="ZW" id="OPTION_378">
                                          Zimbabwe
                                        </option>
                                      </select>
                                      <svg id="svg_379">
                                        <path id="path_380">
                                        </path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div id="DIV_381">
                                <span id="SPAN_382"><span id="SPAN_383"></span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="DIV_384">
                </div>
                <div id="DIV_385">
                  <button type="submit" id="BUTTON_386">
                  </button>
                  <div id="DIV_387">
                  </div>
                  <div id="DIV_388">
                    <span id="SPAN_389">Pay $20.00</span><span id="SPAN_390">Processing...</span>
                  </div>
                  <div id="DIV_391">
                    <div id="DIV_392">
                      <div id="DIV_393">
                        <svg id="svg_394">
                          <path id="path_395">
                          </path>
                        </svg>
                      </div>
                    </div>
                    <div id="DIV_396">
                      <div id="DIV_397">
                        <svg id="svg_398">
                          <ellipse id="ellipse_399">
                          </ellipse>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div id="DIV_400">
                    <div id="DIV_401">
                      <svg id="svg_402">
                        <path id="path_403">
                        </path>
                      </svg>
                    </div>
                  </div>
                  <div id="DIV_404">
                    <div id="DIV_405">
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <footer id="FOOTER_406">
          <div id="DIV_407">
            <a href="https://stripe.com/" rel="noopener" id="A_408"><span id="SPAN_409">Powered by</span></a>
            <svg id="svg_410">
              <g id="g_411">
                <path id="path_412">
                </path>
              </g>
            </svg>
          </div>
          <div id="DIV_413">
            <a href="https://stripe.com/checkout/terms" rel="noopener" id="A_414"><span id="SPAN_415">Terms</span></a><a href="https://stripe.com/privacy" rel="noopener" id="A_416"><span id="SPAN_417">Privacy</span></a>
          </div>
        </footer>
      </div>
    </div>
  );
}





export default StripePayment;