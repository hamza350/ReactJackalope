import React, { Component } from "react";
import "./payment.css";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeProvider } from "react-stripe-elements";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../_metronic/_helpers";

const StripePayment = (props) => {
  const chosenPlan = props.chosenPlan;
  const styles = props.styles;
  let stripe =
    "pk_test_51HGD7HEdu9JfEzPrFMgNkpRpqxvvApxA2wfwIxwHzxaGIbpKDRsBf6WpbN4f071KovBx7eGzoj2dd2WKHmH4DYW500wyNEUkg2";
  const buttonStyle = {
    background: "linear-gradient(135deg, #8426b0 3%, #bd0283 47%, #ec4b3c 98%)",
  };
  return (
    <div
      className="container"
      style={{ backgroundColor: "white", height: "auto" }}
    >
      <div id="DIV_1" style={{ height: "580px" }}>
        <div id="DIV_2">
          <header id="HEADER_3">
            <div id="DIV_4">
              <div id="DIV_5" style={{ paddingLeft: "110px" }}>
                <p className={styles.bank_acc_desc}>Bank Account Information</p>
                <div id="DIV_19">
                  <div id="DIV_22">
                    <span id="SPAN_23">Test</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div id="DIV_24">
            <div id="DIV_25">
              <div id="DIV_26">
                <div id="DIV_27">
                  <Link to="/" className="mt-5" style={{ marginLeft: "130px" }}>
                    <img
                      alt="Logo"
                      className="max-h-200px mb-10"
                      src={toAbsoluteUrl("/media/logos/jlop.png")}
                    />
                  </Link>
                  {/* <img
                    src="https://d1wqzb5bdbcre6.cloudfront.net/52398e185dc774e1b3c0090e3bd35d6af24b6b05/68747470733a2f2f692e696d6775722e636f6d2f45487952326e502e706e67"
                    alt="Product"
                    id="IMG_28"
                  /> */}
                </div>
              </div>
              <div id="DIV_29">
                <span id="SPAN_30">Monthly Installment</span>
                <span id="SPAN_31">$19.99</span>
                <span id="SPAN_32"></span>
                <div id="DIV_33"></div>
              </div>
            </div>
          </div>
        </div>
        <div id="DIV_34" style={{ marginRight: "145px" }}>
          <div id="DIV_35">
            <div id="DIV_36">
              <div id="DIV_37">
                <div id="DIV_38">
                  <div id="DIV_39">Pay with card</div>
                </div>
              </div>
              <div id="DIV_40"></div>
            </div>
            <form id="FORM_41">
              <div id="DIV_42">
                <div id="DIV_43">
                  <div id="DIV_44">
                    <div id="DIV_45">
                      <label for="email" id="LABEL_46">
                        <span id="SPAN_47">Email</span>
                      </label>
                    </div>
                    <div id="DIV_48">
                      <div id="DIV_49">
                        <div id="DIV_50">
                          <div id="DIV_51">
                            <span id="SPAN_52">
                              <input id="INPUT_53" name="email" type="text" />
                            </span>
                          </div>
                        </div>
                        <div id="DIV_54">
                          <span id="SPAN_55">
                            <span id="SPAN_56"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="DIV_57">
                <div id="DIV_58">
                  <div id="DIV_59">
                    <div id="DIV_60">
                      <label for="cardNumber-fieldset" id="LABEL_61">
                        <span id="SPAN_62">Card information</span>
                      </label>
                    </div>
                    <fieldset id="FIELDSET_63">
                      <div id="DIV_64">
                        <div id="DIV_65">
                          <div id="DIV_66">
                            <span id="SPAN_67">
                              <Elements stripe={loadStripe(stripe)}>
                                <CardElement />
                              </Elements>
                            </span>
                            <div id="DIV_69">
                              <div id="DIV_70">
                                <span id="SPAN_71">
                                  <img
                                    src="https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg"
                                    alt="visa"
                                    id="IMG_72"
                                  />
                                </span>
                              </div>
                              <div id="DIV_73">
                                <span id="SPAN_74">
                                  <img
                                    src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"
                                    alt="mastercard"
                                    id="IMG_75"
                                  />
                                </span>
                              </div>
                              <div id="DIV_76">
                                <span id="SPAN_77">
                                  <img
                                    src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg"
                                    alt="amex"
                                    id="IMG_78"
                                  />
                                </span>
                              </div>
                              <div id="DIV_79">
                                <span id="SPAN_80">
                                  <span id="SPAN_81">
                                    <img
                                      src="https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg"
                                      alt="unionpay"
                                      id="IMG_82"
                                    />
                                  </span>
                                </span>
                                <span id="SPAN_83">
                                  <span id="SPAN_84">
                                    <img
                                      src="https://js.stripe.com/v3/fingerprinted/img/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg"
                                      alt="jcb"
                                      id="IMG_85"
                                    />
                                  </span>
                                </span>
                                <span id="SPAN_86">
                                  <span id="SPAN_87">
                                    <img
                                      src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg"
                                      alt="discover"
                                      id="IMG_88"
                                    />
                                  </span>
                                </span>
                                <span id="SPAN_89">
                                  <span id="SPAN_90">
                                    <img
                                      src="https://js.stripe.com/v3/fingerprinted/img/diners-fbcbd3360f8e3f629cdaa80e93abdb8b.svg"
                                      alt="diners"
                                      id="IMG_91"
                                    />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_92">
                          <div id="DIV_93">
                            <span id="SPAN_94" style={{ marginTop: "20px" }}>
                              <input
                                id="INPUT_95"
                                name="cardExpiry"
                                type="text"
                                placeholder="MM / YY"
                              />
                            </span>
                          </div>
                        </div>
                        <div id="DIV_96">
                          <div id="DIV_97">
                            <span id="SPAN_98" style={{ marginTop: "20px" }}>
                              <input
                                id="INPUT_99"
                                name="cardCvc"
                                type="text"
                                placeholder="CVC"
                              />
                            </span>
                            <div id="DIV_100">
                              <svg id="svg_101">
                                <g id="g_102">
                                  <g id="g_103">
                                    <g id="g_104">
                                      <path id="path_105"></path>
                                      <path id="path_106"></path>
                                    </g>
                                    <g id="g_107">
                                      <path id="path_108"></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div id="DIV_109">
                          <span id="SPAN_110">
                            <span id="SPAN_111"></span>
                          </span>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div id="DIV_112">
                  <div id="DIV_113" style={{ marginTop: "10px" }}>
                    <div id="DIV_114">
                      <div id="DIV_115">
                        <div id="DIV_116">
                          <div id="DIV_117">
                            <label for="billingName" id="LABEL_118">
                              <span id="SPAN_119">Name on card</span>
                            </label>
                          </div>
                          <div id="DIV_120">
                            <div id="DIV_121">
                              <div id="DIV_122">
                                <div id="DIV_123">
                                  <span id="SPAN_124">
                                    <input
                                      id="INPUT_125"
                                      name="billingName"
                                      type="text"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div id="DIV_126">
                                <span id="SPAN_127">
                                  <span id="SPAN_128"></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="DIV_129">
                        <div id="DIV_130">
                          <div id="DIV_131">
                            <label for="country" id="LABEL_132">
                              <span id="SPAN_133">Country or region</span>
                            </label>
                          </div>
                          <div id="DIV_134">
                            <div id="DIV_135">
                              <div id="DIV_136">
                                <div id="DIV_137">
                                  <div id="DIV_138">
                                    <div id="DIV_139">
                                      <select
                                        id="SELECT_140"
                                        name="billingCountry"
                                      >
                                        <option id="OPTION_141"></option>
                                        <option value="AF" id="OPTION_142">
                                          Afghanistan
                                        </option>
                                        <option value="AX" id="OPTION_143">
                                          Åland Islands
                                        </option>
                                        <option value="AL" id="OPTION_144">
                                          Albania
                                        </option>
                                        <option value="DZ" id="OPTION_145">
                                          Algeria
                                        </option>
                                        <option value="AD" id="OPTION_146">
                                          Andorra
                                        </option>
                                        <option value="AO" id="OPTION_147">
                                          Angola
                                        </option>
                                        <option value="AI" id="OPTION_148">
                                          Anguilla
                                        </option>
                                        <option value="AQ" id="OPTION_149">
                                          Antarctica
                                        </option>
                                        <option value="AG" id="OPTION_150">
                                          Antigua &amp; Barbuda
                                        </option>
                                        <option value="AR" id="OPTION_151">
                                          Argentina
                                        </option>
                                        <option value="AM" id="OPTION_152">
                                          Armenia
                                        </option>
                                        <option value="AW" id="OPTION_153">
                                          Aruba
                                        </option>
                                        <option value="AC" id="OPTION_154">
                                          Ascension Island
                                        </option>
                                        <option value="AU" id="OPTION_155">
                                          Australia
                                        </option>
                                        <option value="AT" id="OPTION_156">
                                          Austria
                                        </option>
                                        <option value="AZ" id="OPTION_157">
                                          Azerbaijan
                                        </option>
                                        <option value="BS" id="OPTION_158">
                                          Bahamas
                                        </option>
                                        <option value="BH" id="OPTION_159">
                                          Bahrain
                                        </option>
                                        <option value="BD" id="OPTION_160">
                                          Bangladesh
                                        </option>
                                        <option value="BB" id="OPTION_161">
                                          Barbados
                                        </option>
                                        <option value="BY" id="OPTION_162">
                                          Belarus
                                        </option>
                                        <option value="BE" id="OPTION_163">
                                          Belgium
                                        </option>
                                        <option value="BZ" id="OPTION_164">
                                          Belize
                                        </option>
                                        <option value="BJ" id="OPTION_165">
                                          Benin
                                        </option>
                                        <option value="BM" id="OPTION_166">
                                          Bermuda
                                        </option>
                                        <option value="BT" id="OPTION_167">
                                          Bhutan
                                        </option>
                                        <option value="BO" id="OPTION_168">
                                          Bolivia
                                        </option>
                                        <option value="BA" id="OPTION_169">
                                          Bosnia &amp; Herzegovina
                                        </option>
                                        <option value="BW" id="OPTION_170">
                                          Botswana
                                        </option>
                                        <option value="BV" id="OPTION_171">
                                          Bouvet Island
                                        </option>
                                        <option value="BR" id="OPTION_172">
                                          Brazil
                                        </option>
                                        <option value="IO" id="OPTION_173">
                                          British Indian Ocean Territory
                                        </option>
                                        <option value="VG" id="OPTION_174">
                                          British Virgin Islands
                                        </option>
                                        <option value="BN" id="OPTION_175">
                                          Brunei
                                        </option>
                                        <option value="BG" id="OPTION_176">
                                          Bulgaria
                                        </option>
                                        <option value="BF" id="OPTION_177">
                                          Burkina Faso
                                        </option>
                                        <option value="BI" id="OPTION_178">
                                          Burundi
                                        </option>
                                        <option value="KH" id="OPTION_179">
                                          Cambodia
                                        </option>
                                        <option value="CM" id="OPTION_180">
                                          Cameroon
                                        </option>
                                        <option value="CA" id="OPTION_181">
                                          Canada
                                        </option>
                                        <option value="CV" id="OPTION_182">
                                          Cape Verde
                                        </option>
                                        <option value="BQ" id="OPTION_183">
                                          Caribbean Netherlands
                                        </option>
                                        <option value="KY" id="OPTION_184">
                                          Cayman Islands
                                        </option>
                                        <option value="CF" id="OPTION_185">
                                          Central African Republic
                                        </option>
                                        <option value="TD" id="OPTION_186">
                                          Chad
                                        </option>
                                        <option value="CL" id="OPTION_187">
                                          Chile
                                        </option>
                                        <option value="CN" id="OPTION_188">
                                          China
                                        </option>
                                        <option value="CO" id="OPTION_189">
                                          Colombia
                                        </option>
                                        <option value="KM" id="OPTION_190">
                                          Comoros
                                        </option>
                                        <option value="CG" id="OPTION_191">
                                          Congo - Brazzaville
                                        </option>
                                        <option value="CD" id="OPTION_192">
                                          Congo - Kinshasa
                                        </option>
                                        <option value="CK" id="OPTION_193">
                                          Cook Islands
                                        </option>
                                        <option value="CR" id="OPTION_194">
                                          Costa Rica
                                        </option>
                                        <option value="CI" id="OPTION_195">
                                          Côte d’Ivoire
                                        </option>
                                        <option value="HR" id="OPTION_196">
                                          Croatia
                                        </option>
                                        <option value="CW" id="OPTION_197">
                                          Curaçao
                                        </option>
                                        <option value="CY" id="OPTION_198">
                                          Cyprus
                                        </option>
                                        <option value="CZ" id="OPTION_199">
                                          Czechia
                                        </option>
                                        <option value="DK" id="OPTION_200">
                                          Denmark
                                        </option>
                                        <option value="DJ" id="OPTION_201">
                                          Djibouti
                                        </option>
                                        <option value="DM" id="OPTION_202">
                                          Dominica
                                        </option>
                                        <option value="DO" id="OPTION_203">
                                          Dominican Republic
                                        </option>
                                        <option value="EC" id="OPTION_204">
                                          Ecuador
                                        </option>
                                        <option value="EG" id="OPTION_205">
                                          Egypt
                                        </option>
                                        <option value="SV" id="OPTION_206">
                                          El Salvador
                                        </option>
                                        <option value="GQ" id="OPTION_207">
                                          Equatorial Guinea
                                        </option>
                                        <option value="ER" id="OPTION_208">
                                          Eritrea
                                        </option>
                                        <option value="EE" id="OPTION_209">
                                          Estonia
                                        </option>
                                        <option value="SZ" id="OPTION_210">
                                          Eswatini
                                        </option>
                                        <option value="ET" id="OPTION_211">
                                          Ethiopia
                                        </option>
                                        <option value="FK" id="OPTION_212">
                                          Falkland Islands
                                        </option>
                                        <option value="FO" id="OPTION_213">
                                          Faroe Islands
                                        </option>
                                        <option value="FJ" id="OPTION_214">
                                          Fiji
                                        </option>
                                        <option value="FI" id="OPTION_215">
                                          Finland
                                        </option>
                                        <option value="FR" id="OPTION_216">
                                          France
                                        </option>
                                        <option value="GF" id="OPTION_217">
                                          French Guiana
                                        </option>
                                        <option value="PF" id="OPTION_218">
                                          French Polynesia
                                        </option>
                                        <option value="TF" id="OPTION_219">
                                          French Southern Territories
                                        </option>
                                        <option value="GA" id="OPTION_220">
                                          Gabon
                                        </option>
                                        <option value="GM" id="OPTION_221">
                                          Gambia
                                        </option>
                                        <option value="GE" id="OPTION_222">
                                          Georgia
                                        </option>
                                        <option value="DE" id="OPTION_223">
                                          Germany
                                        </option>
                                        <option value="GH" id="OPTION_224">
                                          Ghana
                                        </option>
                                        <option value="GI" id="OPTION_225">
                                          Gibraltar
                                        </option>
                                        <option value="GR" id="OPTION_226">
                                          Greece
                                        </option>
                                        <option value="GL" id="OPTION_227">
                                          Greenland
                                        </option>
                                        <option value="GD" id="OPTION_228">
                                          Grenada
                                        </option>
                                        <option value="GP" id="OPTION_229">
                                          Guadeloupe
                                        </option>
                                        <option value="GU" id="OPTION_230">
                                          Guam
                                        </option>
                                        <option value="GT" id="OPTION_231">
                                          Guatemala
                                        </option>
                                        <option value="GG" id="OPTION_232">
                                          Guernsey
                                        </option>
                                        <option value="GN" id="OPTION_233">
                                          Guinea
                                        </option>
                                        <option value="GW" id="OPTION_234">
                                          Guinea-Bissau
                                        </option>
                                        <option value="GY" id="OPTION_235">
                                          Guyana
                                        </option>
                                        <option value="HT" id="OPTION_236">
                                          Haiti
                                        </option>
                                        <option value="HN" id="OPTION_237">
                                          Honduras
                                        </option>
                                        <option value="HK" id="OPTION_238">
                                          Hong Kong SAR China
                                        </option>
                                        <option value="HU" id="OPTION_239">
                                          Hungary
                                        </option>
                                        <option value="IS" id="OPTION_240">
                                          Iceland
                                        </option>
                                        <option value="IN" id="OPTION_241">
                                          India
                                        </option>
                                        <option value="ID" id="OPTION_242">
                                          Indonesia
                                        </option>
                                        <option value="IQ" id="OPTION_243">
                                          Iraq
                                        </option>
                                        <option value="IE" id="OPTION_244">
                                          Ireland
                                        </option>
                                        <option value="IM" id="OPTION_245">
                                          Isle of Man
                                        </option>
                                        <option value="IL" id="OPTION_246">
                                          Israel
                                        </option>
                                        <option value="IT" id="OPTION_247">
                                          Italy
                                        </option>
                                        <option value="JM" id="OPTION_248">
                                          Jamaica
                                        </option>
                                        <option value="JP" id="OPTION_249">
                                          Japan
                                        </option>
                                        <option value="JE" id="OPTION_250">
                                          Jersey
                                        </option>
                                        <option value="JO" id="OPTION_251">
                                          Jordan
                                        </option>
                                        <option value="KZ" id="OPTION_252">
                                          Kazakhstan
                                        </option>
                                        <option value="KE" id="OPTION_253">
                                          Kenya
                                        </option>
                                        <option value="KI" id="OPTION_254">
                                          Kiribati
                                        </option>
                                        <option value="XK" id="OPTION_255">
                                          Kosovo
                                        </option>
                                        <option value="KW" id="OPTION_256">
                                          Kuwait
                                        </option>
                                        <option value="KG" id="OPTION_257">
                                          Kyrgyzstan
                                        </option>
                                        <option value="LA" id="OPTION_258">
                                          Laos
                                        </option>
                                        <option value="LV" id="OPTION_259">
                                          Latvia
                                        </option>
                                        <option value="LB" id="OPTION_260">
                                          Lebanon
                                        </option>
                                        <option value="LS" id="OPTION_261">
                                          Lesotho
                                        </option>
                                        <option value="LR" id="OPTION_262">
                                          Liberia
                                        </option>
                                        <option value="LY" id="OPTION_263">
                                          Libya
                                        </option>
                                        <option value="LI" id="OPTION_264">
                                          Liechtenstein
                                        </option>
                                        <option value="LT" id="OPTION_265">
                                          Lithuania
                                        </option>
                                        <option value="LU" id="OPTION_266">
                                          Luxembourg
                                        </option>
                                        <option value="MO" id="OPTION_267">
                                          Macao SAR China
                                        </option>
                                        <option value="MG" id="OPTION_268">
                                          Madagascar
                                        </option>
                                        <option value="MW" id="OPTION_269">
                                          Malawi
                                        </option>
                                        <option value="MY" id="OPTION_270">
                                          Malaysia
                                        </option>
                                        <option value="MV" id="OPTION_271">
                                          Maldives
                                        </option>
                                        <option value="ML" id="OPTION_272">
                                          Mali
                                        </option>
                                        <option value="MT" id="OPTION_273">
                                          Malta
                                        </option>
                                        <option value="MQ" id="OPTION_274">
                                          Martinique
                                        </option>
                                        <option value="MR" id="OPTION_275">
                                          Mauritania
                                        </option>
                                        <option value="MU" id="OPTION_276">
                                          Mauritius
                                        </option>
                                        <option value="YT" id="OPTION_277">
                                          Mayotte
                                        </option>
                                        <option value="MX" id="OPTION_278">
                                          Mexico
                                        </option>
                                        <option value="MD" id="OPTION_279">
                                          Moldova
                                        </option>
                                        <option value="MC" id="OPTION_280">
                                          Monaco
                                        </option>
                                        <option value="MN" id="OPTION_281">
                                          Mongolia
                                        </option>
                                        <option value="ME" id="OPTION_282">
                                          Montenegro
                                        </option>
                                        <option value="MS" id="OPTION_283">
                                          Montserrat
                                        </option>
                                        <option value="MA" id="OPTION_284">
                                          Morocco
                                        </option>
                                        <option value="MZ" id="OPTION_285">
                                          Mozambique
                                        </option>
                                        <option value="MM" id="OPTION_286">
                                          Myanmar (Burma)
                                        </option>
                                        <option value="NA" id="OPTION_287">
                                          Namibia
                                        </option>
                                        <option value="NR" id="OPTION_288">
                                          Nauru
                                        </option>
                                        <option value="NP" id="OPTION_289">
                                          Nepal
                                        </option>
                                        <option value="NL" id="OPTION_290">
                                          Netherlands
                                        </option>
                                        <option value="NC" id="OPTION_291">
                                          New Caledonia
                                        </option>
                                        <option value="NZ" id="OPTION_292">
                                          New Zealand
                                        </option>
                                        <option value="NI" id="OPTION_293">
                                          Nicaragua
                                        </option>
                                        <option value="NE" id="OPTION_294">
                                          Niger
                                        </option>
                                        <option value="NG" id="OPTION_295">
                                          Nigeria
                                        </option>
                                        <option value="NU" id="OPTION_296">
                                          Niue
                                        </option>
                                        <option value="MK" id="OPTION_297">
                                          North Macedonia
                                        </option>
                                        <option value="NO" id="OPTION_298">
                                          Norway
                                        </option>
                                        <option value="OM" id="OPTION_299">
                                          Oman
                                        </option>
                                        <option value="PK" id="OPTION_300">
                                          Pakistan
                                        </option>
                                        <option value="PS" id="OPTION_301">
                                          Palestinian Territories
                                        </option>
                                        <option value="PA" id="OPTION_302">
                                          Panama
                                        </option>
                                        <option value="PG" id="OPTION_303">
                                          Papua New Guinea
                                        </option>
                                        <option value="PY" id="OPTION_304">
                                          Paraguay
                                        </option>
                                        <option value="PE" id="OPTION_305">
                                          Peru
                                        </option>
                                        <option value="PH" id="OPTION_306">
                                          Philippines
                                        </option>
                                        <option value="PN" id="OPTION_307">
                                          Pitcairn Islands
                                        </option>
                                        <option value="PL" id="OPTION_308">
                                          Poland
                                        </option>
                                        <option value="PT" id="OPTION_309">
                                          Portugal
                                        </option>
                                        <option value="PR" id="OPTION_310">
                                          Puerto Rico
                                        </option>
                                        <option value="QA" id="OPTION_311">
                                          Qatar
                                        </option>
                                        <option value="KR" id="OPTION_312">
                                          Republic of Korea
                                        </option>
                                        <option value="RE" id="OPTION_313">
                                          Réunion
                                        </option>
                                        <option value="RO" id="OPTION_314">
                                          Romania
                                        </option>
                                        <option value="RU" id="OPTION_315">
                                          Russia
                                        </option>
                                        <option value="RW" id="OPTION_316">
                                          Rwanda
                                        </option>
                                        <option value="WS" id="OPTION_317">
                                          Samoa
                                        </option>
                                        <option value="SM" id="OPTION_318">
                                          San Marino
                                        </option>
                                        <option value="ST" id="OPTION_319">
                                          São Tomé &amp; Príncipe
                                        </option>
                                        <option value="SA" id="OPTION_320">
                                          Saudi Arabia
                                        </option>
                                        <option value="SN" id="OPTION_321">
                                          Senegal
                                        </option>
                                        <option value="RS" id="OPTION_322">
                                          Serbia
                                        </option>
                                        <option value="SC" id="OPTION_323">
                                          Seychelles
                                        </option>
                                        <option value="SL" id="OPTION_324">
                                          Sierra Leone
                                        </option>
                                        <option value="SG" id="OPTION_325">
                                          Singapore
                                        </option>
                                        <option value="SX" id="OPTION_326">
                                          Sint Maarten
                                        </option>
                                        <option value="SK" id="OPTION_327">
                                          Slovakia
                                        </option>
                                        <option value="SI" id="OPTION_328">
                                          Slovenia
                                        </option>
                                        <option value="SB" id="OPTION_329">
                                          Solomon Islands
                                        </option>
                                        <option value="SO" id="OPTION_330">
                                          Somalia
                                        </option>
                                        <option value="ZA" id="OPTION_331">
                                          South Africa
                                        </option>
                                        <option value="GS" id="OPTION_332">
                                          South Georgia &amp; South Sandwich
                                          Islands
                                        </option>
                                        <option value="SS" id="OPTION_333">
                                          South Sudan
                                        </option>
                                        <option value="ES" id="OPTION_334">
                                          Spain
                                        </option>
                                        <option value="LK" id="OPTION_335">
                                          Sri Lanka
                                        </option>
                                        <option value="BL" id="OPTION_336">
                                          St. Barthélemy
                                        </option>
                                        <option value="SH" id="OPTION_337">
                                          St. Helena
                                        </option>
                                        <option value="KN" id="OPTION_338">
                                          St. Kitts &amp; Nevis
                                        </option>
                                        <option value="LC" id="OPTION_339">
                                          St. Lucia
                                        </option>
                                        <option value="MF" id="OPTION_340">
                                          St. Martin
                                        </option>
                                        <option value="PM" id="OPTION_341">
                                          St. Pierre &amp; Miquelon
                                        </option>
                                        <option value="VC" id="OPTION_342">
                                          St. Vincent &amp; Grenadines
                                        </option>
                                        <option value="SR" id="OPTION_343">
                                          Suriname
                                        </option>
                                        <option value="SJ" id="OPTION_344">
                                          Svalbard &amp; Jan Mayen
                                        </option>
                                        <option value="SE" id="OPTION_345">
                                          Sweden
                                        </option>
                                        <option value="CH" id="OPTION_346">
                                          Switzerland
                                        </option>
                                        <option value="TW" id="OPTION_347">
                                          Taiwan
                                        </option>
                                        <option value="TJ" id="OPTION_348">
                                          Tajikistan
                                        </option>
                                        <option value="TZ" id="OPTION_349">
                                          Tanzania
                                        </option>
                                        <option value="TH" id="OPTION_350">
                                          Thailand
                                        </option>
                                        <option value="TL" id="OPTION_351">
                                          Timor-Leste
                                        </option>
                                        <option value="TG" id="OPTION_352">
                                          Togo
                                        </option>
                                        <option value="TK" id="OPTION_353">
                                          Tokelau
                                        </option>
                                        <option value="TO" id="OPTION_354">
                                          Tonga
                                        </option>
                                        <option value="TT" id="OPTION_355">
                                          Trinidad &amp; Tobago
                                        </option>
                                        <option value="TA" id="OPTION_356">
                                          Tristan da Cunha
                                        </option>
                                        <option value="TN" id="OPTION_357">
                                          Tunisia
                                        </option>
                                        <option value="TR" id="OPTION_358">
                                          Turkey
                                        </option>
                                        <option value="TM" id="OPTION_359">
                                          Turkmenistan
                                        </option>
                                        <option value="TC" id="OPTION_360">
                                          Turks &amp; Caicos Islands
                                        </option>
                                        <option value="TV" id="OPTION_361">
                                          Tuvalu
                                        </option>
                                        <option value="UG" id="OPTION_362">
                                          Uganda
                                        </option>
                                        <option value="UA" id="OPTION_363">
                                          Ukraine
                                        </option>
                                        <option value="AE" id="OPTION_364">
                                          United Arab Emirates
                                        </option>
                                        <option value="GB" id="OPTION_365">
                                          United Kingdom
                                        </option>
                                        <option value="US" id="OPTION_366">
                                          United States
                                        </option>
                                        <option value="UY" id="OPTION_367">
                                          Uruguay
                                        </option>
                                        <option value="UZ" id="OPTION_368">
                                          Uzbekistan
                                        </option>
                                        <option value="VU" id="OPTION_369">
                                          Vanuatu
                                        </option>
                                        <option value="VA" id="OPTION_370">
                                          Vatican City
                                        </option>
                                        <option value="VE" id="OPTION_371">
                                          Venezuela
                                        </option>
                                        <option value="VN" id="OPTION_372">
                                          Vietnam
                                        </option>
                                        <option value="WF" id="OPTION_373">
                                          Wallis &amp; Futuna
                                        </option>
                                        <option value="EH" id="OPTION_374">
                                          Western Sahara
                                        </option>
                                        <option value="YE" id="OPTION_375">
                                          Yemen
                                        </option>
                                        <option value="ZM" id="OPTION_376">
                                          Zambia
                                        </option>
                                        <option value="ZW" id="OPTION_377">
                                          Zimbabwe
                                        </option>
                                      </select>
                                      <svg id="svg_378">
                                        <path id="path_379"></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div id="DIV_380">
                                <span id="SPAN_381">
                                  <span id="SPAN_382"></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="DIV_383"></div>
                <div id="DIV_384">
                  <button
                    id="BUTTON_385"
                    type="submit"
                    className="btn btn-primary font-weight-bold px-9 py-4 my-3  border border-left-0 "
                    style={buttonStyle}
                  >
                    <span>Pay Now</span>
                  </button>
                  {/* <button type="submit" id="BUTTON_385">Pay Now</button> */}
                  <div id="DIV_386"></div>
                  <div id="DIV_387">
                    <span id="SPAN_388">Pay $20.00</span>
                    <span id="SPAN_389">Processing...</span>
                  </div>
                  <div id="DIV_390">
                    <div id="DIV_391">
                      <div id="DIV_392">
                        <svg id="svg_393">
                          <path id="path_394"></path>
                        </svg>
                      </div>
                    </div>
                    <div id="DIV_395">
                      <div id="DIV_396">
                        <svg id="svg_397">
                          <ellipse id="ellipse_398"></ellipse>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div id="DIV_399">
                    <div id="DIV_400">
                      <svg id="svg_401">
                        <path id="path_402"></path>
                      </svg>
                    </div>
                  </div>
                  <div id="DIV_403">
                    <div id="DIV_404"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <span className={styles.desclaimer_desc}>
            Disclaimer: The subscription can be cancelled at anytime and is
            billed on a monthly basis, unless the annual option has been
            selected.
          </span>
        </div>

      </div>
    </div>
  );
};

export default StripePayment;
